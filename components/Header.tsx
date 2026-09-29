import React from "react";

//Header라는 상수의 타입은 React.FC이고, JSX를 반환하는 화살표 함수를 할당했다.
//마지막에 export default로 다른 파일에서 사용할 수 있게 내보낸다.
const Header: React.FC = () => {
  return (
    <header
      className={`
        sticky top-0 z-50
        bg-background/80
        backdrop-blur-md
        px-6 pt-12 pb-4
        flex justify-between items-center
      `}
    >
      {/* 
      sticky top-0 z-50 : 스크롤해도 Header가 화면 상단에 붙어 있고, 다른 콘텐츠보다 위에 표시되도록 한다.
      bg-background/80 : 배경색을 background 색상으로 하고 투명도를 적용한다.
      backdrop-blur-md : Header 뒤에 비치는 화면을 흐리게(blur) 만듭니다.
      px-6 pt-12 pb-4 : padding px-6  → 좌우 6 / pt-12 → 위 12 / pb-4  → 아래 4
      flex justify-between items-center : 내부 요소들은 가로로 배치하여 양 끝으로 벌리고 세로 중앙에 정렬한다.
      */}

      <div className="flex items-center gap-3">
        <div className="relative">
          {/* alt → 이미지 대체 텍스트 */}
          <img
            alt="Profile"
            className="w-12 h-12 rounded-full border-2 border-primary object-cover"
            src="/my_photo.JPG"
          />
          {/* <div className="absolute bottom-0.5 right-0.5 w-3 h-3 bg-green-500 border-2 border-background rounded-full"></div> */}
        </div>
        <div>
          <h1 className="font-bold text-lg leading-none tracking-tight">
            박수연
          </h1>
          {/* <p> → 문단 */}
          <p className="text-[11px] text-slate-500 font-medium mt-1">
            Backend Developer
            <br />
          </p>
        </div>
      </div>
      {/* <a> → 링크 */}
      <a
        href="mailto:develop.dduddu@gmail.com"
        className="bg-primary text-white px-5 py-2 rounded-full text-xs font-bold shadow-lg shadow-primary/30 active:scale-95 transition-all inline-block"
      >
        Contact
      </a>
    </header>
  );
};

export default Header;
