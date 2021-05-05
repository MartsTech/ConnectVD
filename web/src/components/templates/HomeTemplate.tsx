import HomeFeature from "@module/HomeFeature";
import HomeShortcut from "@module/HomeShortcut";
import Canvas from "@section/Canvas";
import Footer from "@section/Footer";
import Header from "@section/Header";
import homeSections from "@service/homeSections";

interface HomeTemplateProps {}

const HomeTemplate: React.FC<HomeTemplateProps> = ({}) => {
  return (
    <div className="w-full h-full">
      <Header home="/" />
      <div
        id="top"
        className="w-full p-2 bg-secondary text-white text-center font-medium"
      >
        We have developed resources to help you stay connect.
      </div>
      <Canvas />

      <div className="grid grid-cols-2 sm:grid-cols-4 w-full bg-primary-800 py-2">
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
