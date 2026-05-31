import { useMemo, useState } from 'react'

const DATA = {
  과학: {
    '2단원': {
      '지권의 구성': {
        summary: [
          '지권은 지구의 겉부분과 내부를 포함하는 단단한 부분이다.',
          '지권은 지각, 맨틀, 외핵, 내핵으로 이루어진다.',
          '대륙 지각은 주로 화강암질 암석, 해양 지각은 주로 현무암질 암석으로 이루어진다.',
          '지구 내부 구조는 지진파를 이용해 알아낸다.',
        ],
        detail: [
          '광물은 암석을 이루는 기본 물질이다.',
          '대표 광물: 장석, 휘석, 석영, 각섬석, 감람석, 흑운모, 적철석, 자철석, 방해석.',
          '자철석은 자성이 있어 자석에 붙는다.',
          '방해석은 묽은 염산과 반응하여 거품이 발생한다.',
          '석영은 유리, 반도체, 시계 등에 활용된다.',
          '장석은 도자기와 유리의 원료로 활용된다.',
          '석회암은 시멘트 원료로 활용된다.',
          '화강암과 대리암은 건축재로 활용된다.',
        ],
        quiz: [['암석을 이루는 기본 물질은?', '광물'], ['자성이 있어 자석에 붙는 광물은?', '자철석'], ['묽은 염산과 반응하는 광물은?', '방해석']],
      },
      '암석의 종류와 순환': {
        summary: [
          '암석은 생성 과정에 따라 화성암, 퇴적암, 변성암으로 나뉜다.',
          '화성암은 마그마나 용암이 식어서 만들어진 암석이다.',
          '퇴적암은 퇴적물이 쌓이고 굳어져 만들어진 암석이다.',
          '변성암은 기존 암석이 열과 압력을 받아 성질이 변한 암석이다.',
        ],
        detail: [
          '암석의 순환: 마그마 → 화성암 → 퇴적물 → 퇴적암 → 변성암 → 마그마',
          '화산암은 지표 부근에서 빠르게 식어 만들어지고 알갱이가 작다.',
          '심성암은 지하 깊은 곳에서 천천히 식어 만들어지고 알갱이가 크다.',
          '퇴적암 종류: 역암, 사암, 이암, 석회암.',
          '층리는 퇴적암에서 주로 나타나는 층 모양 구조이다.',
          '엽리는 변성암에서 주로 나타나는 줄무늬 구조이다.',
          '사암 → 규암, 석회암 → 대리암, 화강암 → 편마암.',
        ],
        quiz: [['마그마나 용암이 식어서 만들어진 암석은?', '화성암'], ['퇴적암에서 주로 나타나는 층 모양 구조는?', '층리'], ['사암이 변성되면?', '규암']],
      },
      '대륙 이동과 판의 경계': {
        summary: [
          '판게아는 과거 모든 대륙이 하나로 붙어 있던 초대륙이다.',
          '베게너는 대륙 이동설을 주장했다.',
          '대륙 이동설의 증거에는 해안선 모양, 같은 화석, 이어지는 지층과 산맥, 빙하 흔적이 있다.',
        ],
        detail: [
          '화산대는 화산 활동이 자주 일어나는 지역이다.',
          '지진대는 지진이 자주 일어나는 지역이다.',
          '화산대와 지진대는 판의 경계와 대체로 비슷하게 분포한다.',
        ],
        quiz: [['과거 모든 대륙이 하나로 붙어 있던 초대륙은?', '판게아'], ['대륙 이동설을 주장한 과학자는?', '베게너'], ['지진이 자주 일어나는 지역은?', '지진대']],
      },
    },
    '5단원': {
      소화: {
        summary: ['소화는 음식물을 몸에 흡수될 수 있을 만큼 작은 물질로 분해하는 과정이다.', '소화계는 소화관과 소화샘으로 이루어진다.', '음식물 이동 경로: 입 → 식도 → 위 → 소장 → 대장 → 항문'],
        detail: ['소화관은 음식물이 직접 지나가는 길이다.', '소화샘은 소화액을 분비하는 기관이다.', '소장은 대부분의 소화와 영양소 흡수가 일어나는 곳이다.', '대장은 주로 물을 흡수한다.', '간은 쓸개즙을 만들고, 쓸개는 쓸개즙을 저장한다.', '이자는 이자액을 분비한다.'],
        quiz: [['음식물이 직접 지나가는 길은?', '소화관'], ['대부분의 영양소가 흡수되는 기관은?', '소장'], ['쓸개즙을 만드는 기관은?', '간']],
      },
      순환: {
        summary: ['순환은 혈액이 온몸을 돌며 산소, 영양소, 노폐물 등을 운반하는 과정이다.', '혈액 이동 경로: 온몸 → 대정맥 → 심장 → 폐동맥 → 폐 → 폐정맥 → 심장 → 대동맥 → 온몸', '혈액은 혈장과 혈구로 이루어진다.'],
        detail: ['동맥은 심장에서 나가는 혈액이 흐르는 혈관이다.', '정맥은 심장으로 돌아오는 혈액이 흐르는 혈관이다.', '모세혈관은 세포와 물질 교환이 일어나는 가는 혈관이다.', '폐동맥은 심장에서 폐로 가는 혈관이다.', '폐정맥은 폐에서 심장으로 돌아오는 혈관이다.', '대동맥은 심장에서 온몸으로 나가는 큰 동맥이다.', '대정맥은 온몸에서 심장으로 돌아오는 큰 정맥이다.', '혈장은 액체 성분, 적혈구는 산소 운반, 백혈구는 세균 방어, 혈소판은 혈액 응고를 담당한다.'],
        quiz: [['심장에서 폐로 가는 혈관은?', '폐동맥'], ['폐에서 심장으로 돌아오는 혈관은?', '폐정맥'], ['산소를 운반하는 혈구는?', '적혈구']],
      },
      호흡: {
        summary: ['호흡은 산소를 받아들이고 이산화 탄소를 내보내는 과정이다.', '공기 이동 경로: 코 → 기관 → 기관지 → 폐 → 폐포', '폐포에서 산소와 이산화 탄소의 기체 교환이 일어난다.'],
        detail: ['폐포의 산소는 모세혈관의 혈액으로 이동한다.', '혈액 속 이산화 탄소는 폐포로 이동한다.', '기체는 농도가 높은 곳에서 낮은 곳으로 이동한다.', '세포 호흡은 세포에서 영양소를 분해하여 에너지를 얻는 과정이다.'],
        quiz: [['기체 교환이 일어나는 폐의 작은 공기주머니는?', '폐포'], ['기관 다음 공기 이동 경로는?', '기관지']],
      },
      배설: {
        summary: ['배설은 몸속 노폐물을 몸 밖으로 내보내는 과정이다.', '오줌 이동 경로: 콩팥 → 오줌관 → 방광 → 요도 → 몸 밖', '콩팥은 혈액 속 노폐물을 걸러 오줌을 만든다.'],
        detail: ['오줌관은 오줌을 방광으로 보낸다.', '방광은 오줌을 잠시 저장한다.', '요도는 오줌을 몸 밖으로 내보내는 통로이다.', '배설은 몸속 환경을 일정하게 유지하는 데 중요하다.'],
        quiz: [['혈액 속 노폐물을 걸러 오줌을 만드는 기관은?', '콩팥'], ['오줌을 잠시 저장하는 기관은?', '방광']],
      },
    },
  },
  수학: {
    시험범위: {
      일차부등식: {
        summary: ['부등식은 >, <, ≥, ≤를 사용하여 수의 크기를 나타낸 식이다.', '음수를 곱하거나 나누면 부등호 방향이 바뀐다.'],
        detail: ['괄호를 풀고 문자항과 숫자를 정리한다.', '마지막에 음수로 나누었는지 반드시 확인한다.'],
        quiz: [['부등식 양변에 음수를 곱하면 부등호 방향은?', '바뀐다']],
      },
      연립일차방정식: {
        summary: ['미지수가 2개인 일차방정식 2개를 동시에 만족하는 해를 구한다.', '대표 풀이 방법은 대입법과 가감법이다.'],
        detail: ['대입법은 한 식을 x= 또는 y= 꼴로 바꿔 다른 식에 대입한다.', '가감법은 두 식을 더하거나 빼서 한 미지수를 없앤다.'],
        quiz: [['두 식을 더하거나 빼서 한 미지수를 없애는 방법은?', '가감법']],
      },
      일차함수: {
        summary: ['일차함수는 y = ax + b 꼴로 나타낸다.', 'a는 기울기, b는 y절편이다.'],
        detail: ['기울기 = y의 증가량 / x의 증가량', 'a > 0이면 오른쪽 위로 올라가고, a < 0이면 오른쪽 아래로 내려간다.'],
        quiz: [['y = 3x - 2에서 기울기는?', '3']],
      },
    },
  },
  영어: {
    'Lesson 03': {
      '본문 요약': {
        summary: ['Necessity Is the Mother of Invention: 필요는 발명의 어머니이다.', '본문은 필요 때문에 만들어진 발명품을 소개한다.'],
        detail: ['Bicycle / 자전거 - Karl von Drais, Germany, 1817년에 만들어짐. 말이 부족해 새로운 이동 수단이 필요해서 만들어짐.', 'Whiteout / 수정액 - Bette Graham, Texas, USA, 1956년에 만들어짐. 타자 실수를 쉽게 고치기 위해 만들어짐.', 'Webcam / 웹캠 - Dr. Quentin Stafford-Fraser and Dr. Paul Jardetzky, England, 1991년에 만들어짐. 커피포트가 비었는지 확인하기 위해 만들어짐.'],
        quiz: [['Whiteout을 발명한 사람은?', 'Bette Graham'], ['첫 웹캠은 무엇을 보기 위해 만들어졌을까?', '커피포트']],
      },
      '핵심 문법': {
        summary: ['수동태: be동사 + 과거분사(p.p.)', "had to는 have p.p.가 아니라 '~해야 했다'라는 뜻이다."],
        detail: ['In those days, people rode horses, but many horses were killed for food.', 'Whiteout was invented by Bette Graham in 1956.', 'The first webcam was invented to watch a coffee pot.', 'At that time, people had to type the whole page when they made even a small mistake.', 'So, they had to make many disappointing trips to the empty coffee pot.'],
        quiz: [['was invented는 무슨 문법일까?', '수동태'], ['had to의 뜻은?', '해야 했다']],
      },
    },
  },
  국어: {
    '1단원': {
      '엄마 걱정 / 화자와 서술자': {
        summary: ['시는 말하는 사람을 화자라고 한다.', '소설이나 이야기에서 사건을 전달하는 사람은 서술자이다.'],
        detail: ['화자의 상황과 정서를 파악하는 것이 중요하다.', '화자와 서술자는 작가와 항상 같은 사람이 아니다.'],
        quiz: [['시에서 말하는 사람은?', '화자'], ['소설에서 사건을 전달하는 사람은?', '서술자']],
      },
    },
  },
  역사: {
    '추가 예정': {
      '자료 추가 대기': {
        summary: ['역사 시험범위를 보내면 같은 방식으로 정리할 수 있다.'],
        detail: ['연표, 핵심 인물, 사건 원인과 결과, 빈출 문제 형태로 정리 가능.'],
        quiz: [['역사 범위는 추가되었나요?', '아직']],
      },
    },
  },
}

function norm(v) {
  return String(v || '').toLowerCase().replace(/\s/g, '').replace(/[.,!?]/g, '')
}

function App() {
  const [subject, setSubject] = useState('과학')
  const [unit, setUnit] = useState('2단원')
  const [category, setCategory] = useState('지권의 구성')
  const [answers, setAnswers] = useState({})
  const [search, setSearch] = useState('')
  const [model, setModel] = useState('openrouter/free')
  const [question, setQuestion] = useState('')
  const [aiAnswer, setAiAnswer] = useState('')
  const [extra, setExtra] = useState('')
  const [loading, setLoading] = useState(false)

  const unitNames = Object.keys(DATA[subject])
  const categoryNames = Object.keys(DATA[subject][unit])
  const current = DATA[subject][unit][category]

  const context = useMemo(() => {
    let text = ''
    Object.keys(DATA).forEach(s => {
      text += `\n[${s}]\n`
      Object.keys(DATA[s]).forEach(u => {
        text += `${u}\n`
        Object.keys(DATA[s][u]).forEach(c => {
          const item = DATA[s][u][c]
          text += `${c}\n요약: ${item.summary.join(' / ')}\n상세: ${item.detail.join(' / ')}\n`
        })
      })
    })
    return text + '\n추가자료:\n' + extra
  }, [extra])

  const changeSubject = (s) => {
    const firstUnit = Object.keys(DATA[s])[0]
    const firstCat = Object.keys(DATA[s][firstUnit])[0]
    setSubject(s)
    setUnit(firstUnit)
    setCategory(firstCat)
    setAnswers({})
  }

  const changeUnit = (u) => {
    const firstCat = Object.keys(DATA[subject][u])[0]
    setUnit(u)
    setCategory(firstCat)
    setAnswers({})
  }

  const localAnswer = () => {
    const q = search.trim()
    if (!q) return ''
    const found = []
    Object.keys(DATA).forEach(s => {
      Object.keys(DATA[s]).forEach(u => {
        Object.keys(DATA[s][u]).forEach(c => {
          const item = DATA[s][u][c]
          const joined = [...item.summary, ...item.detail].join(' ')
          if (joined.includes(q) || c.includes(q)) found.push(`[${s} > ${u} > ${c}]\n${joined}`)
        })
      })
    })
    return found.slice(0, 3).join('\n\n')
  }

  const askAI = async () => {
    if (!question.trim()) {
      setAiAnswer('질문을 먼저 입력해줘.')
      return
    }

    setLoading(true)
    setAiAnswer('')

    try {
      const res = await fetch('/.netlify/functions/ask', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ question, context, model }),
      })

      const data = await res.json()

      if (!res.ok) {
        setAiAnswer(data.error || 'AI 답변 요청에 실패했어.')
        return
      }

      setAiAnswer(data.answer || '답변을 불러오지 못했어.')
    } catch (err) {
      setAiAnswer('오류가 났어. Netlify 배포 상태나 인터넷 연결을 확인해줘.
' + err.message)
    } finally {
      setLoading(false)
    }
  }

  const searchResult = localAnswer()

  return (
    <div>
      <div className="header">
        <h1>중2 시험공부 AI 사이트</h1>
        <p>과목별 개념 정리 + 문제 + 질문 답변</p>
      </div>

      <div className="container">
        <div className="card">
          <b>시험범위</b>
          <div>
            {Object.keys(DATA).map(s => <span className="tag" key={s}>{s}</span>)}
          </div>
        </div>

        <div className="grid">
          <div>
            <div className="card menu">
              <h2>과목</h2>
              {Object.keys(DATA).map(s => (
                <button key={s} className={subject === s ? 'active' : ''} onClick={() => changeSubject(s)}>{s}</button>
              ))}
            </div>

            <div className="card">
              <h2>검색</h2>
              <input value={search} onChange={e => setSearch(e.target.value)} placeholder="예: 폐동맥, 수동태, 층리" />
              {searchResult && <div className="aiBox" style={{marginTop: 12}}>{searchResult}</div>}
            </div>
          </div>

          <div>
            <div className="card">
              <h2>{subject}</h2>

              <h3>단원</h3>
              <div className="row">
                {unitNames.map(u => (
                  <button className={unit === u ? 'smallBtn active' : 'smallBtn'} key={u} onClick={() => changeUnit(u)}>{u}</button>
                ))}
              </div>

              <h3>카테고리</h3>
              <div className="row">
                {categoryNames.map(c => (
                  <button className={category === c ? 'smallBtn active' : 'smallBtn'} key={c} onClick={() => { setCategory(c); setAnswers({}) }}>{c}</button>
                ))}
              </div>

              <div className="box">
                <h2>{category}</h2>
                <h3>핵심 요약</h3>
                <ul>{current.summary.map((x, i) => <li key={i}>{x}</li>)}</ul>
                <h3>자세한 설명</h3>
                <ul>{current.detail.map((x, i) => <li key={i}>{x}</li>)}</ul>
              </div>

              <div className="quiz">
                <h3>간단한 문제</h3>
                {current.quiz.map(([q, a], i) => {
                  const user = answers[i] || ''
                  const checked = user.length > 0
                  const ok = checked && norm(user) === norm(a)
                  return (
                    <div key={i} style={{marginBottom: 14}}>
                      <b>{i + 1}. {q}</b>
                      <input value={user} onChange={e => setAnswers({...answers, [i]: e.target.value})} placeholder="정답 입력" />
                      {checked && <div className={ok ? 'answer good' : 'answer bad'}>{ok ? '정답!' : `오답. 정답: ${a}`}</div>}
                    </div>
                  )
                })}
              </div>
            </div>

            <div className="card">
              <h2>AI 질문 답변</h2>
              <p>친구들은 API 키를 입력하지 않아도 돼. 키는 Netlify 환경변수에 숨겨서 사용해.</p>
              <input value={model} onChange={e => setModel(e.target.value)} placeholder="모델명 예: openrouter/free" />
              <textarea value={question} onChange={e => setQuestion(e.target.value)} placeholder="예: 폐동맥과 폐정맥 차이 알려줘" />
              <button className="smallBtn active" onClick={askAI}>{loading ? '답변 생성 중...' : '질문하기'}</button>
              {aiAnswer && <div className="aiBox">{aiAnswer}</div>}
            </div>

            <div className="card">
              <h2>교과서 / 문제집 내용 추가</h2>
              <p>PDF 내용은 복사해서 아래에 붙여넣으면 AI 질문 답변에 같이 사용돼.</p>
              <textarea value={extra} onChange={e => setExtra(e.target.value)} placeholder="교과서 내용, 문제집 해설, 선생님 필기 붙여넣기" />
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default App
