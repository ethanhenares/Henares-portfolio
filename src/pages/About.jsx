import BodyText from '../components/BodyText.jsx'
import Page from '../components/Page.jsx'
import PageTitle from '../components/PageTitle.jsx'

const skills = [
  'Poster & layout design',
  'Duotone and collage techniques',
  'Photoshop & Illustrator',
  'Typography (Latin and Japanese)',
]

export default function About() {
  return (
    <Page>
      <PageTitle>About</PageTitle>
      <BodyText>
        I'm kei, a graphic design student who loves turning music into pictures. I make posters with
        duotone color and collage texture, aiming for images where you can almost hear the drumbeat.
        Most of my work so far is fan art for artists I admire.
      </BodyText>
      <BodyText lang="ja">
        音楽を絵にするのが好きなグラフィックデザインの学生です。デュオトーンとコラージュの質感で、鼓動が聞こえてきそうなポスターを作っています。
      </BodyText>

      <h2 className="mt-10 mb-[0.8rem] text-[0.8rem] font-bold">Skills</h2>
      <ul>
        {skills.map((skill) => (
          <li key={skill} className="border-b border-line py-[0.55rem] text-[0.85rem]">
            {skill}
          </li>
        ))}
      </ul>
    </Page>
  )
}