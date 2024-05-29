const HeroSection = () => {
    return (
      <div>
        <div className="header text-white">
          <div className="left">
            <button className="icon ion-location"></button>
          </div>
          <div className="right">
            <button className="icon ion-share"></button>
          </div>
        </div>
        <div className="cover blend-soft-light align-center blue-800" style={{ backgroundImage: 'url(https://res.cloudinary.com/dws2bgxg4/image/upload/v1713424680/medplus/vdhawsoagg1029odkjsj.jpg' }}>
          <div className="space"></div>
          <div className="space"></div>
          <div className="space"></div>
          <h1 className="text-huge text-white text-light">  welcome  our doctors are ready for you </h1>
          <p className="text-small text-white text-light">
            To know new places around the world
          </p>
          <div className="space"></div>
        </div>
             </div>
    );
  };
  
  export default HeroSection;
  