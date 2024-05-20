const AboutDevs = () => {
    return (
      <div className="about-container">
        <h1 className="about-me">About 🎯 Devs</h1>
        <ul className="developer-pro">
          <li className="developer">
          <h2>Marlon</h2>
          <a
            href="https://github.com/MarlonPelau"
            className="github-link"
            target="_blank"
          >
            <img
              src="https://res.cloudinary.com/dgifdj6nx/image/upload/v1716214712/IMG_77381_zgqqdi.jpg"
              alt="Marlon!"
              width="300"
              height="300"
            />
          </a>
          <p className="fun-fact">
            {" "}
            <b>Fun Fact:</b> "Marlon provided cover, and even used drone technology to escape injury in this Open Data Hackathon" 🤷🏾‍♂️
          </p>
          <h2>Kenneth</h2>
          <a
            href="https://github.com/KenCab123/"
            className="github-link"
            target="_blank"
          >
            <img
              src="https://res.cloudinary.com/dgifdj6nx/image/upload/v1716214563/Screenshot_2024-04-01_at_3.22.13_PM_cghw1j.png"
              alt="Ken!"
              width="300"
              height="300"
            />
          </a>
          <p className="fun-fact">
            {" "}
            <b>Fun Fact:</b> "Ken wore his bullet-proof vest the whole time, and he wasn't even grazed in this Open Data Hackathon" 🤷🏾‍♂️
          </p>
          <h2>Timothy</h2>
          <a
            href="?"
            className="github-link"
            target="_blank"
          >
            <img
              src="https://github.com/TimNatal1887/"
              alt="Tim!"
              width="300"
              height="300"
            />
          </a>
          <p className="fun-fact">
            {" "}
            <b>Fun Fact:</b> "Dodging every bullet, Tim escaped unscathed in this Open Data Hackathon"." 🤷🏾‍♂️
          </p>
        </li>
      </ul>
    </div>
  );
};

export default AboutDevs;