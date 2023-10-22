import React from "react";
import clsx from "clsx";
import styles from "./styles.module.css";
import Head from "@docusaurus/Head";
import BirdSvg from "@site/static/img/bird.svg";

type FeatureItem = {
  title: string;
  Svg: React.ComponentType<React.ComponentProps<"svg">>;
  description: JSX.Element;
};

const FeatureList: FeatureItem[] = [
  {
    title: "Easy to Use",
    Svg: require("@site/static/img/dot-circle-solid.svg").default,
    description: (
      <>
        Easily hide transaction amounts and create single-use addresses to mask
        your on-chain activity and have proper wallet hygiene without thinking.
      </>
    ),
  },
  {
    title: "Extensible",
    Svg: require("@site/static/img/modular.svg").default,
    description: (
      <>
        Extend the functionality of Bank of JubJub by using contract plugins,
        such as escrow, sealed-bid auctions, and private swapping.
      </>
    ),
  },
  {
    title: "Powered by cryptography",
    Svg: require("@site/static/img/ethereum.svg").default,
    description: (
      <>
        Bank of JubJub runs on Ethereum and is made possible by zk-SNARKs, and
        homomorphic encryption.
      </>
    ),
  },
];

function Feature({ title, Svg, description }: FeatureItem) {
  return (
    <div className={clsx("col col--4")}>
      <div className="text--center">
        <Svg className={styles.featureSvg} role="img" />
      </div>
      <div className="text--center padding-horiz--md">
        <h3>{title}</h3>
        <p>{description}</p>
      </div>
    </div>
  );
}

export default function HomepageFeatures(): JSX.Element {
  return (
    <div>
      <div
        style={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <div style={{ width: "20%", textAlign: "center" }}>
          <BirdSvg />
        </div>
      </div>
      <section className={styles.features}>
        <div className="container">
          <div className="row">
            {FeatureList.map((props, idx) => (
              <Feature key={idx} {...props} />
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
