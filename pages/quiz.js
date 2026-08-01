import { useState, useEffect, useRef } from 'react';
import Head from 'next/head';
import Image from 'next/image';
import { toPng } from 'html-to-image';
import cities from '../data/cities';
import countryData from '../data/countryData';
import { generateQuiz } from '../lib/generateQuiz';

const continents = [...new Set(cities.map((c) => c.continent))];
const countryCodes = [...new Set(cities.map((c) => c.countryCode))].filter((code) => countryData[code]);

const TIME_PER_QUESTION = 15;

export default function QuizPage() {
  const [mode, setMode] = useState(null); // 'continent' | 'country'
  const [selection, setSelection] = useState(null);
  const [questions, setQuestions] = useState([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [score, setScore] = useState(0);
  const [streak, setStreak] = useState(0);
  const [bestStreak, setBestStreak] = useState(0);
  const [selected, setSelected] = useState(null);
  const [finished, setFinished] = useState(false);
  const [timeLeft, setTimeLeft] = useState(TIME_PER_QUESTION);
  const [copied, setCopied] = useState(false);
  const timerRef = useRef(null);
  const resultCardRef = useRef(null);

  const handleShare = async () => {
    const label = mode === 'continent' ? selection : countryData[selection]?.name;
    const shareData = {
      title: 'World Facts Quiz — Locafacts',
      text: `I scored ${score}/${questions.length} on the ${label} World Facts Quiz on Locafacts! Think you can beat me?`,
      url: 'https://locafacts.com/quiz',
    };
    if (navigator.share) {
      try {
        await navigator.share(shareData);
      } catch (err) {
        // user cancelled, ignore
      }
    } else {
      await navigator.clipboard.writeText(`${shareData.text} ${shareData.url}`);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    }
  };

  const handleDownload = async () => {
    if (!resultCardRef.current) return;
    const dataUrl = await toPng(resultCardRef.current, { backgroundColor: '#101B2D' });
    const link = document.createElement('a');
    link.download = `locafacts-quiz-score.png`;
    link.href = dataUrl;
    link.click();
  };

  function startQuiz(chosenMode, chosenValue) {
    const generated = generateQuiz(chosenMode, chosenValue, 10);
    setMode(chosenMode);
    setSelection(chosenValue);
    setQuestions(generated);
    setCurrentIndex(0);
    setScore(0);
    setStreak(0);
    setBestStreak(0);
    setSelected(null);
    setFinished(false);
    setTimeLeft(TIME_PER_QUESTION);
  }

  useEffect(() => {
    if (!questions.length || finished || selected) return;
    if (timeLeft <= 0) {
      handleAnswer(null); // time's up, counts as wrong
      return;
    }
    timerRef.current = setTimeout(() => setTimeLeft((t) => t - 1), 1000);
    return () => clearTimeout(timerRef.current);
  }, [timeLeft, questions, finished, selected]);

  function handleAnswer(option) {
    if (selected) return;
    clearTimeout(timerRef.current);
    setSelected(option || '__timeout__');
    if (option === questions[currentIndex].correctAnswer) {
      setScore((s) => s + 1);
      setStreak((s) => {
        const next = s + 1;
        setBestStreak((best) => Math.max(best, next));
        return next;
      });
    } else {
      setStreak(0);
    }
  }

  function nextQuestion() {
    if (currentIndex + 1 >= questions.length) {
      setFinished(true);
    } else {
      setCurrentIndex((i) => i + 1);
      setSelected(null);
      setTimeLeft(TIME_PER_QUESTION);
    }
  }

  function resetQuiz() {
    setMode(null);
    setSelection(null);
    setQuestions([]);
    setFinished(false);
    clearTimeout(timerRef.current);
  }
function getResultMessage(score, total) {
  const pct = score / total;
  if (pct === 1) return "Perfect score! You truly know your way around the globe. 🌍";
  if (pct >= 0.8) return "Excellent work! You're basically a geography expert.";
  if (pct >= 0.6) return "Great job! You know your facts well.";
  if (pct >= 0.4) return "Not bad — a few more rounds and you'll be an expert.";
  return "Nice try! Play again and see how much you can improve.";
}
  return (
    <>
      <Head>
        <title>World Facts Quiz | Locafacts</title>
        <meta name="description" content="Test your knowledge of world cities, capitals, currencies, and more." />
      </Head>

      <main style={{ maxWidth: '700px', margin: '0 auto', padding: '60px 24px' }}>
        <div
          style={{
            position: 'relative',
            width: '100%',
            height: '220px',
            borderRadius: '16px',
            overflow: 'hidden',
            marginBottom: '32px',
            border: '1px solid var(--border)',
          }}
        >
          <Image
            src="/images/quiz-hero.jpg"
            alt="World facts geography quiz"
            fill
            sizes="(max-width: 700px) 100vw, 700px"
            style={{ objectFit: 'cover' }}
            priority
          />
          <div
            style={{
              position: 'absolute',
              inset: 0,
              background: 'linear-gradient(to top, rgba(0,0,0,0.55), rgba(0,0,0,0))',
            }}
          />
          <h1
            className="font-display"
            style={{
              position: 'absolute',
              bottom: '20px',
              left: '24px',
              fontSize: '36px',
              color: '#fff',
              margin: 0,
            }}
          >
            World Facts Quiz
          </h1>
        </div>
        <p style={{ color: 'var(--text-muted)', fontSize: '15px', lineHeight: '1.7', marginBottom: '32px' }}>
          Think you know your way around the globe? The Locafacts World Facts Quiz puts your knowledge of countries, capitals, currencies, and travel trivia to the test. Choose a continent to face a mix of questions pulled from real cities across Asia, Europe, Africa, the Americas, and Oceania, or pick a single country for a focused round on its capital, currency, and nearest major airport. Every round features multiple-choice questions, a ticking timer to keep things challenging, and a streak counter that rewards consecutive correct answers. Whether you're a seasoned traveler, a geography enthusiast, or just looking for a fun way to learn something new, this quiz offers a quick and engaging way to test yourself. Questions are randomized each time you play, so no two rounds are ever exactly the same — see how high a score and streak you can build.
        </p>

        {!mode && (
          <div
            style={{
              backgroundColor: 'var(--bg-card)',
              border: '1px solid var(--border)',
              borderRadius: '18px',
              padding: '32px',
            }}
          >
    <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '12px', marginBottom: '32px' }}>
      {continents.map((c) => {
        const icons = {
          Asia: '🏯',
          Europe: '🏰',
          Africa: '🦁',
          'North America': '🗽',
          'South America': '🌎',
          Oceania: '🏝️',
        };
        return (
          <button
            key={c}
            onClick={() => startQuiz('continent', c)}
            style={{
              backgroundColor: 'var(--bg)',
              border: '2px solid var(--border)',
              borderRadius: '12px',
              padding: '18px 12px',
              color: 'var(--text)',
              cursor: 'pointer',
              textAlign: 'center',
              transition: 'border-color 0.15s ease, transform 0.1s ease',
              fontSize: '14px',
              fontWeight: 600,
            }}
            onMouseEnter={(e) => (e.currentTarget.style.borderColor = 'var(--accent)')}
            onMouseLeave={(e) => (e.currentTarget.style.borderColor = 'var(--border)')}
            onMouseDown={(e) => (e.currentTarget.style.transform = 'scale(0.97)')}
            onMouseUp={(e) => (e.currentTarget.style.transform = 'scale(1)')}
          >
            <div style={{ fontSize: '24px', marginBottom: '8px' }}>{icons[c] || '🌐'}</div>
            {c}
          </button>
        );
      })}
    </div>

    <h3 className="font-display" style={{ fontSize: '18px', marginBottom: '14px', color: 'var(--text)' }}>
      By Country
    </h3>
    <select
      onChange={(e) => e.target.value && startQuiz('country', e.target.value)}
      defaultValue=""
      style={{
        width: '100%',
        padding: '16px',
        borderRadius: '12px',
        border: '2px solid var(--border)',
        backgroundColor: 'var(--bg)',
        color: 'var(--text)',
        fontSize: '15px',
        cursor: 'pointer',
        transition: 'border-color 0.15s ease',
      }}
      onFocus={(e) => (e.target.style.borderColor = 'var(--accent)')}
      onBlur={(e) => (e.target.style.borderColor = 'var(--border)')}
    >
      <option value="" disabled>Select a country...</option>
      {countryCodes.map((code) => (
        <option key={code} value={code}>{countryData[code].flag} {countryData[code].name}</option>
      ))}
    </select>
  </div>
)}

        {mode && !finished && questions.length > 0 && (
          <div>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '16px' }}>
              <p className="font-mono-data" style={{ color: 'var(--gold)' }}>
                Q{currentIndex + 1}/{questions.length} · Score {score} · Streak {streak}🔥
              </p>
              <button onClick={resetQuiz} style={{ background: 'none', border: '1px solid var(--border)', borderRadius: '8px', padding: '6px 12px', color: 'var(--text-muted)', cursor: 'pointer', fontSize: '13px' }}>
                Reset
              </button>
            </div>

            <div style={{ height: '6px', backgroundColor: 'var(--border)', borderRadius: '4px', marginBottom: '20px', overflow: 'hidden' }}>
              <div style={{ height: '100%', width: `${(timeLeft / TIME_PER_QUESTION) * 100}%`, backgroundColor: timeLeft <= 5 ? '#B5544A' : 'var(--accent)', transition: 'width 1s linear' }} />
            </div>

            <h2 className="font-display" style={{ fontSize: '22px', marginBottom: '24px', color: 'var(--text)' }}>
              {questions[currentIndex].question}
            </h2>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '12px', marginBottom: '24px' }}>
              {questions[currentIndex].options.map((option) => {
                const isCorrect = option === questions[currentIndex].correctAnswer;
                const isSelected = option === selected;
                let bg = 'var(--bg-card)';
                if (selected) {
                  if (isCorrect) bg = 'var(--accent)';
                  else if (isSelected) bg = '#B5544A';
                }
                return (
                  <button
                    key={option}
                    onClick={() => handleAnswer(option)}
                    disabled={!!selected}
                    style={{ backgroundColor: bg, border: '1px solid var(--border)', borderRadius: '10px', padding: '14px', color: selected && (isCorrect || isSelected) ? '#fff' : 'var(--text)', fontSize: '15px', cursor: selected ? 'default' : 'pointer', textAlign: 'left' }}
                  >
                    {option}
                  </button>
                );
              })}
            </div>
            {selected && (
              <button
                onClick={nextQuestion}
                style={{ backgroundColor: 'var(--accent)', border: 'none', borderRadius: '10px', padding: '12px 24px', color: '#fff', fontSize: '15px', cursor: 'pointer' }}
              >
                {currentIndex + 1 >= questions.length ? 'See Results' : 'Next Question'}
              </button>
            )}
          </div>
        )}

       {finished && (
          <div style={{ textAlign: 'center' }}>
            <div
              ref={resultCardRef}
              style={{
                backgroundColor: 'var(--bg-card)',
                border: '1px solid var(--border)',
                borderRadius: '16px',
                padding: '32px 24px',
                marginBottom: '20px',
              }}
            >
              <p style={{ fontSize: '12px', color: 'var(--gold)', marginBottom: '12px', letterSpacing: '0.06em', textTransform: 'uppercase' }}>
                Locafacts World Facts Quiz
              </p>
              <p className="font-display" style={{ fontSize: '32px', marginBottom: '12px', color: 'var(--text)' }}>
                {score} / {questions.length}
              </p>
              <p style={{ color: 'var(--accent)', fontSize: '16px', marginBottom: '16px', fontWeight: 600 }}>
                {getResultMessage(score, questions.length)}
              </p>
              <p style={{ color: 'var(--text-muted)', marginBottom: '4px' }}>
                Best streak: {bestStreak}🔥
              </p>
              <p style={{ color: 'var(--text-muted)' }}>
                {mode === 'continent' ? selection : countryData[selection]?.name}
              </p>
            </div>

            <div style={{ display: 'flex', gap: '12px', marginBottom: '20px' }}>
              <button
                onClick={handleShare}
                style={{
                  flex: 1,
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  gap: '8px',
                  padding: '12px',
                  borderRadius: '10px',
                  border: '1px solid var(--border)',
                  backgroundColor: 'var(--bg-card)',
                  color: 'var(--text)',
                  fontSize: '14px',
                  cursor: 'pointer',
                }}
              >
                {copied ? '✓ Copied' : '↗ Share Score'}
              </button>
              <button
                onClick={handleDownload}
                style={{
                  flex: 1,
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  gap: '8px',
                  padding: '12px',
                  borderRadius: '10px',
                  border: '1px solid var(--border)',
                  backgroundColor: 'var(--bg-card)',
                  color: 'var(--text)',
                  fontSize: '14px',
                  cursor: 'pointer',
                }}
              >
                ⬇ Download
              </button>
            </div>

            <button
              onClick={resetQuiz}
              style={{ backgroundColor: 'var(--accent)', border: 'none', borderRadius: '10px', padding: '12px 24px', color: '#fff', fontSize: '15px', cursor: 'pointer' }}
            >
              Play Again
            </button>
          </div>
          
        )}
        <section style={{ marginTop: '60px', borderTop: '1px solid var(--border)', paddingTop: '40px' }}>
  <h2 className="font-display" style={{ fontSize: '26px', marginBottom: '16px', color: 'var(--text)' }}>
    Why Test Your World Geography Knowledge?
  </h2>
  <p style={{ color: 'var(--text-muted)', fontSize: '15px', lineHeight: '1.8', marginBottom: '20px' }}>
    Geography quizzes have long been a favorite way to learn about the world, and for good reason. Testing yourself on capitals, currencies, and countries does more than pass the time — it builds a mental map of the planet that sticks with you far longer than passively reading facts ever could. Every time you guess wrong and see the correct answer, your brain forms a stronger connection to that piece of information, a learning effect researchers call the "testing effect." That's exactly the philosophy behind the Locafacts World Facts Quiz: short, focused rounds that turn idle curiosity into lasting knowledge.
  </p>

  <h3 className="font-display" style={{ fontSize: '20px', marginBottom: '12px', color: 'var(--text)' }}>
    How the Locafacts Quiz Works
  </h3>
  <p style={{ color: 'var(--text-muted)', fontSize: '15px', lineHeight: '1.8', marginBottom: '20px' }}>
    Unlike static trivia decks that repeat the same questions every time, this quiz pulls fresh data from real cities across Asia, Europe, Africa, the Americas, and Oceania. Every round is generated on the spot, mixing questions about which country a city belongs to, its capital, its currency, and its nearest major airport. You can choose to play by continent for a broad, varied challenge, or narrow things down to a single country for a focused deep-dive into that nation's essentials. Because the questions and answer choices are shuffled fresh each time, no two quiz attempts are ever quite the same — which means you can keep coming back without ever memorizing your way to a perfect score.
  </p>

  <h3 className="font-display" style={{ fontSize: '20px', marginBottom: '12px', color: 'var(--text)' }}>
    A Little Pressure Makes It More Fun
  </h3>
  <p style={{ color: 'var(--text-muted)', fontSize: '15px', lineHeight: '1.8', marginBottom: '20px' }}>
    Each question comes with a ticking countdown, adding just enough pressure to keep you sharp without making the game feel unfair. Answer quickly and correctly, and your streak counter climbs — a simple mechanic that turns a single quiz into a small personal challenge. How long can you keep your streak alive before a tricky currency question or an unfamiliar capital breaks it? That streak, paired with your final score, gives you something concrete to try and beat the next time you play.
  </p>

  <h3 className="font-display" style={{ fontSize: '20px', marginBottom: '12px', color: 'var(--text)' }}>
    Who This Quiz Is For
  </h3>
  <p style={{ color: 'var(--text-muted)', fontSize: '15px', lineHeight: '1.8', marginBottom: '20px' }}>
    You don't need to be a seasoned traveler or a geography buff to enjoy this. Students studying world capitals for school, travelers brushing up on the countries they're about to visit, trivia night regulars looking for practice, or anyone who simply enjoys learning a new fact or two will find something here. Because questions cover a mix of practical travel details — like nearest airports and local currencies — alongside classic geography trivia, the quiz naturally suits both casual players and people with a genuine interest in how the world fits together.
  </p>

  <h3 className="font-display" style={{ fontSize: '20px', marginBottom: '12px', color: 'var(--text)' }}>
    Tips to Improve Your Score
  </h3>
  <p style={{ color: 'var(--text-muted)', fontSize: '15px', lineHeight: '1.8', marginBottom: '20px' }}>
    If you're aiming for a perfect run, a few strategies help. Start with continent mode rather than country mode — playing through a region repeatedly exposes you to the same handful of countries from different angles, which reinforces facts faster than jumping randomly across the globe. Pay attention when you get a question wrong: the correct answer is shown immediately, and taking a second to actually register it (rather than clicking straight to the next question) is what makes the fact stick for your next attempt. Finally, don't rush purely for the timer — a wrong fast answer breaks your streak just as surely as a slow one, so aim for accuracy first and speed second.
  </p>

  <h3 className="font-display" style={{ fontSize: '20px', marginBottom: '12px', color: 'var(--text)' }}>
    Beyond the Quiz
  </h3>
  <p style={{ color: 'var(--text-muted)', fontSize: '15px', lineHeight: '1.8' }}>
    If a question stumps you and you want to dig deeper, every city featured in this quiz has its own dedicated page on Locafacts with live weather, currency exchange rates, air quality readings, emergency numbers, and other essential facts — updated automatically throughout the day. So whether you're here purely for the challenge or you end up going down a rabbit hole learning about a country you'd never thought much about before, there's always more to explore once the quiz round ends. Play a round, check your score, and see how well you really know the world.
  </p>
</section>
      </main>
    </>
  );
}