import React from "react";
import clsx from "clsx";
import styles from "./styles.module.css";

type FeatureItem = {
  title: string;
  // Svg: React.ComponentType<React.ComponentProps<"svg">>;
  description: JSX.Element;
};

const FeatureList: FeatureItem[] = [
  {
    title: "Catatan Perkuliahan",
    // Svg: require("@site/static/img/undraw_docusaurus_mountain.svg").default,
    description: (
      <>
        Berisi semua <code>catatan kodingan</code> selama perkuliahan pada program studi <strong>Sistem informasi S1</strong>
      </>
    ),
  },
  {
    title: "Toram Online",
    // Svg: require("@site/static/img/undraw_docusaurus_tree.svg").default,
    description: (
      <>
        Pemain Toram Online selama 5 tahun dan memberikan informasi panduan bermain Toram pada <code>Grup Kaesa Toram Online</code>.
      </>
    ),
  },
  {
    title: "Berbagi Informasi",
    // Svg: require("@site/static/img/undraw_docusaurus_react.svg").default,
    description: (
      <>
        Berbagi informasi yang mempermudah hidup dan meningkatkan <code>level kemalasan</code>.
      </>
    ),
  },
];

// function Feature({ title, Svg, description }: FeatureItem) {
function Feature({ title, description }: FeatureItem) {
  return (
    <div className={clsx("col col--4")}>
      {/* <div className="text--center">
        <Svg className={styles.featureSvg} role="img" />
      </div> */}
      <div className="text--center padding-horiz--md">
        <h3>{title}</h3>
        <p>{description}</p>
      </div>
    </div>
  );
}

export default function HomepageFeatures(): JSX.Element {
  return (
    <section className={styles.features}>
      <div className="container">
        <div className="row">
          {FeatureList.map((props, idx) => (
            <Feature key={idx} {...props} />
          ))}
        </div>
      </div>
    </section>
  );
}
