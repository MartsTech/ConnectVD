import HomeFeature from "@module/HomeFeature";
import HomeShortcut from "@module/HomeShortcut";
import Canvas from "@section/Canvas";
import Footer from "@section/Footer";
import Header from "@section/Header";
import homeSections from "@service/homeSections";

interface HomeTemplateProps {}

const HomeTemplate: React.FC<HomeTemplateProps> = ({}) => {
  return (
    <div>
      <Header />
      <div
        id="top"
        className="w-full p-2 bg-[#3f51b5] text-white text-center font-medium"
      >
        <p>We have developed resources to help you stay connect.</p>
      </div>
      <Canvas />
      <div className="grid grid-cols-2 sm:grid-cols-4 w-full bg-[#2b2b2b] py-2">
        {homeSections.map(({ title, Icon }) => (
          <HomeShortcut key={`shortcut_${title}`} title={title} Icon={Icon} />
        ))}
      </div>
      <div>
        {homeSections.map(({ title, desc }, id) => (
          <HomeFeature
            key={`feature_${title}`}
            title={title}
            desc={desc}
            reverse={id % 2 !== 0}
          />
        ))}
      </div>
      <Footer />
    </div>
  );
};

export default HomeTemplate;
