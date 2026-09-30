import React from 'react';
import Header from './components/Header';
import Hero from './components/Hero';
import Proficiency from './components/Proficiency';
import MainProjects from './components/MainProjects';
import Expertise from './components/Expertise';
import OtherProjects from './components/OtherProjects';
import Footer from './components/Footer';

//UI를 반환하는 React 함수 컴포넌트
//React.FC  : React Function Component(리액트 함수 컴포넌트)
const Home: React.FC = () => {
    return (
        //<> : React 컴포넌트가 여러 요소를 반환할 때 하나의 부모로 묶어주는 역할
        /**
         * <div>...</div>
            → 묶어줌
            → 실제 HTML 요소도 생성됨

            <>...</>
            → 묶어줌
            → 별도 HTML 요소는 생성하지 않음
            → React Fragment
         */
        <>
            <Header />
            <main className="relative z-10">
                <Hero />
                <Proficiency />
                <MainProjects />
                <Expertise />
                <OtherProjects />
            </main>
            <Footer />
        </>
    );
};

export default Home;
