// import gamestackTexture2Large from 'assets/gamestack-list-large.jpg';
// import gamestackTexture2Placeholder from 'assets/gamestack-list-placeholder.jpg';
// import gamestackTexture2 from 'assets/gamestack-list.jpg';
// import gamestackTextureLarge from 'assets/gamestack-login-large.jpg';
// import gamestackTexturePlaceholder from 'assets/gamestack-login-placeholder.jpg';
// import gamestackTexture from 'assets/gamestack-login.jpg';
// import sliceTextureLarge from 'assets/slice-app-large.jpg';
// import sliceTexturePlaceholder from 'assets/slice-app-placeholder.jpg';
// import sliceTexture from 'assets/slice-app.jpg';
// import sprTextureLarge from 'assets/spr-lesson-builder-dark-large.jpg';
// import sprTexturePlaceholder from 'assets/spr-lesson-builder-dark-placeholder.jpg';
// import sprTexture from 'assets/spr-lesson-builder-dark.jpg';
import { Footer } from 'components/Footer';
import { Meta } from 'components/Meta';
import { Intro } from 'layouts/Home/Intro';
import { Profile } from 'layouts/Home/Profile';
import { ProjectSummary } from 'layouts/Home/ProjectSummary';
import { useEffect, useRef, useState } from 'react';
import styles from './Home.module.css';

const disciplines = ['Exceler', 'Blogger', 'Website', 'UI / UX'];

export const Home = () => {
  const [visibleSections, setVisibleSections] = useState([]);
  const [scrollIndicatorHidden, setScrollIndicatorHidden] = useState(false);
  const intro = useRef();
  const projectOne = useRef();
  const projectTwo = useRef();
  const projectThree = useRef();
  const projectFour = useRef();
  const details = useRef();

  useEffect(() => {
    const sections = [intro, projectOne, projectTwo, projectThree, projectFour, details];

    const sectionObserver = new IntersectionObserver(
      (entries, observer) => {
        entries.forEach(entry => {
          if (entry.isIntersecting) {
            const section = entry.target;
            observer.unobserve(section);
            if (visibleSections.includes(section)) return;
            setVisibleSections(prevSections => [...prevSections, section]);
          }
        });
      },
      { rootMargin: '0px 0px -10% 0px', threshold: 0.1 }
    );

    const indicatorObserver = new IntersectionObserver(
      ([entry]) => {
        setScrollIndicatorHidden(!entry.isIntersecting);
      },
      { rootMargin: '-100% 0px 0px 0px' }
    );

    sections.forEach(section => {
      sectionObserver.observe(section.current);
    });

    indicatorObserver.observe(intro.current);

    return () => {
      sectionObserver.disconnect();
      indicatorObserver.disconnect();
    };
  }, [visibleSections]);

  return (
    <div className={styles.home}>
      <Meta
        title="Web Developer + Exceler"
        description="Design portfolio of Miftakul Azizi."
      />
      <Intro
        id="intro"
        sectionRef={intro}
        disciplines={disciplines}
        scrollIndicatorHidden={scrollIndicatorHidden}
      />

      {/* KONTEN KARYA  */}

      <ProjectSummary
        id="project-1"
        sectionRef={projectOne}
        visible={visibleSections.includes(projectOne.current)}
        index={1}
        title="Excel App, Koperasi Simpan Pijam"
        description="Sebuah Aplikasi Untuk Mempermudah Dalam Mengelolah Keuangan Koperasi"
        buttonText="Lihat Project"
        buttonLink="https://github.com/AHzizi/Apklikasi-Koperasi-Simpan-Pinjam-Excel"
        // model={{
        //   type: 'laptop',
        //   alt: 'Smart Sparrow lesson builder',
        //   textures: [
        //     {
        //       srcSet: [sprTexture, sprTextureLarge],
        //       placeholder: sprTexturePlaceholder,
        //     },
        //   ],
        // }}
      />
      <ProjectSummary
        id="project-2"
        alternate
        sectionRef={projectTwo}
        visible={visibleSections.includes(projectTwo.current)}
        index={2}
        title="UI Design for Supercell ID"
        description="UI Design For Supercell ID App"
        buttonText="View website"
        buttonLink="#"
        // model={{
        //   type: 'phone',
        //   alt: 'App login screen',
        //   textures: [
        //     {
        //       srcSet: [gamestackTexture, gamestackTextureLarge],
        //       placeholder: gamestackTexturePlaceholder,
        //     },
        //     {
        //       srcSet: [gamestackTexture2, gamestackTexture2Large],
        //       placeholder: gamestackTexture2Placeholder,
        //     },
        //   ],
        // }}
      />
      <ProjectSummary
        id="project-3"
        sectionRef={projectThree}
        visible={visibleSections.includes(projectThree.current)}
        index={3}
        title="Periodic Table In Excel"
        description="Simple, Easy To Use"
        buttonText="View project"
        buttonLink="https://github.com/AHzizi/PeriodicTableMsExcel"
        // model={{
        //   type: 'laptop',
        //   alt: 'Annotating a biomedical image in the Slice app',
        //   textures: [
        //     {
        //       srcSet: [sliceTexture, sliceTextureLarge],
        //       placeholder: sliceTexturePlaceholder,
        //     },
        //   ],
        // }}
      />
      <ProjectSummary
        id="project-4"
        alternate
        sectionRef={projectFour}
        visible={visibleSections.includes(projectFour.current)}
        index={4}
        title="React Music App"
        description="A Simple Music Player"
        buttonText="View Project"
        buttonLink="https://our-musicfav.vercel.app"
        // model={{
        //   type: 'phone',
        //   alt: 'App login screen',
        //   textures: [
        //     {
        //       srcSet: [gamestackTexture, gamestackTextureLarge],
        //       placeholder: gamestackTexturePlaceholder,
        //     },
        //     {
        //       srcSet: [gamestackTexture2, gamestackTexture2Large],
        //       placeholder: gamestackTexture2Placeholder,
        //     },
        //   ],
        // }}
      />
      <Profile
        sectionRef={details}
        visible={visibleSections.includes(details.current)}
        id="details"
      />
      <Footer />
    </div>
  );
};
