export default function Home() {
  return (
    <section className="flex min-h-[60svh] flex-col items-start justify-end pb-8 sm:items-end md:min-h-svh md:pb-14">
      {/* Text block in the bottom corner, like the reference layout */}
      <p lang="ja" className="text-left text-[0.8rem] leading-[1.45] font-bold">
        はじめまして、
        <br />
        keiです。
        <br />
        音楽を絵にするのが
        <br />
        好きな
        <br />
        グラフィックデザインの
        <br />
        学生です。
      </p>
      <p className="mt-[1.2rem] text-left text-[0.8rem] leading-[1.45] font-normal text-muted">
        Graphic design student
        <br />
        turning music into pictures
        <br />
        with duotone and collage.
      </p>
    </section>
  )
}