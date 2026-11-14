const skills = [
  'Poster & layout design',
  'Duotone and collage techniques',
  'Photoshop & Illustrator',
  'Typography (English and Japanese)',
  'Album and CD mockups',
]

export default function About() {
  return (
    <section className="page page-right">
      <h1 className="page-title">About</h1>
      <p className="body-text">
        I'm kei, a graphic design student who loves turning music into pictures. I make posters with
        duotone color and collage texture, aiming for images where you can almost hear the drumbeat.
        Most of my work so far is fan art for artists I admire.
      </p>
      <p className="body-text" lang="ja">
        音楽を絵にするのが好きなグラフィックデザインの学生です。デュオトーンとコラージュの質感で、鼓動が聞こえてきそうなポスターを作っています。
      </p>
      <h2 className="section-title">Skills</h2>
      <ul className="skills">
        {skills.map((s) => (
          <li key={s}>{s}</li>
        ))}
      </ul>
    </section>
  )
}
