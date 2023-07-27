import React, { useState, useEffect, useRef } from 'react';
import { Link, graphql, useStaticQuery } from "gatsby";
import { GatsbyImage, IGatsbyImageData } from "gatsby-plugin-image";
import { useSiteMetadata } from "../hooks/use-site-metadata"

import Header from '../components/header';
import Footer from '../components/footer';
import SEO from "../components/seo";
import SummitContact from "../components/summit-contact";
import Testimonials from "../components/testimonials";
import Cross from "../components/cross";
import MuxHome from '../components/mux-home';
import Map from '../components/map';

import IndustrialImage from '../images/industrail-image';
import WeldingImage from '../images/welding-image';
import CutImage from '../images/cut-image';

function SummitInfo() {
  const ref = useRef();

  const [jump, setJump] = useState(0);

  // trying to cleanup typescript warnings
  if (ref.current) {
    useEffect(() => {
      // console.log(ref.current.clientHeight);
      const height = ref.current.clientHeight;
      setJump(height);
      // adding the [] only re-renders on change
    }, [jump]);
  }

  const high = {
    // ? why does this have a second and not a pix
    height: { jump }.jump,
  }

  return (
    <div className="summit__info">
      <div id="summit__info--shape" className="summit--shape" style={high}>{/* stay gold */}</div>
      <div className="summit__info--text" ref={ref}>
        {/* this has old naming and needs to be checked */}
        <h1>Specialist Laser Cutting &amp; Steel Suppliers, Fabricators and Welders in Christchurch.</h1>
        <p>With over 67 years running experience, Priest Sheetmetal is an
          established name as a manufacturer and supplier of profile cut and
          fabricated steelwork to Christchurch businesses.</p>
      </div>
    </div>
  );
}

// queries the height of the text block to make the shapeoutside cut
function SummitAbout() {
  // query the current box
  const ref = useRef();
  // set the height of the slice
  // start at 0
  const [jump, setJump] = useState(0);

  useEffect(() => {
    // console.log(ref.current.clientHeight);
    // TODO needs an if ref statement
    const height = ref.current.clientHeight;
    setJump(height);
    // adding the [] only re-renders on change
  }, [jump]);

  const high = {
    // why does this have a second and not a pix
    height: { jump }.jump,
  }

  return (
    <div className="summit__about">
      <div id="summit__about--shape" className="summit--shape" style={high}>{/* stay gold */}</div>
      <section id="summit__about--text" ref={ref} >
        <h2>Adding value through craftsmanship.</h2>
        <p>Our skilled team of tradesman, draftsman and general engineers offer a range of plate processing and metal fabrication services to meet your engineering needs. With the latest in CNC machinery, CAD software and one of the largest selections of steel folding press brakes in New Zealand we can be sure to assist you at every stage; from design, prototyping through to production.<br /><b>Design for manufacturing, gets products built faster.</b></p>
      </section>
    </div>
  );
}

const IndexPage = () => {

  const data = useStaticQuery(graphql`
  query IndexQuery {
    allStrapiService(sort: {order: ASC}) {
      nodes {
        id
        title
        slug
        excerpt

        cover {
          alternativeText
          localFile {
            childImageSharp {
              gatsbyImageData
            }
          }
        }
      }
    }

    allStrapiIndustry(sort: {order: ASC}) {
      nodes {
        id
        title
        byline
        slug
        
        cover {
          alternativeText
          localFile {
            childImageSharp {
              gatsbyImageData
            }
          }
        }
      }
    }

  }
`)


  return (
    <>
      <Header />
      <div className="summit__backer--wrapper">
        <div className="summit__backer">
          <section id="summit">
            <SummitInfo />

            <SummitAbout />

            <div className="summit__video">
              <MuxHome />
            </div>

            <div className="summit__videobacker">
              <IndustrialImage />
              {/* this is a secondary version of the image until I figure out some magic */}
              <div className="blue-backer">{/* stay gold */}</div>
            </div>

            <div className="summit__team-photo_1">
              <WeldingImage />
            </div>
            <div className="summit__team-photo_2">
              <CutImage />
            </div>

            <div className="summit__contact">
              <SummitContact />
            </div>
          </section>
        </div>
      </div>

      <div className="tasks__wrapper">
        {data.allStrapiService.nodes.map((service: {
          id: string;
          slug: string;
          title: string;
          cover: { localFile: { childImageSharp: { gatsbyImageData: IGatsbyImageData; }; }; alternativeText: string; };
          excerpt: string;
        }) => (
          <div key={service.id} className="tasks--outer">
            <section className="tasks">
              <h3 className="tasks__title h4">
                <Link to={`/services/${service.slug}`}>
                  {service.title}
                </Link>
              </h3>

              <div className="tasks__background--upper shadow">
                {/* stay gold */}
              </div>

              <Link
                to={`/services/${service.slug}`}
                className="tasks__image shadow"
                title={service.title}
              >
                <GatsbyImage
                  image={
                    service.cover?.localFile?.childImageSharp
                      ?.gatsbyImageData
                  }
                  alt={service.cover?.alternativeText}
                  className="shadow"
                />
              </Link>

              <div className="tasks__info">
                <div className="clipshaper">
                  <div className="clipper">{/* stay gold */}</div>
                  <p>{service.excerpt}</p>
                </div>

                <div className="service__more--back">{/* stay gold */}</div>
                <Link
                  to={`/services/${service.slug}`}
                  className="service__more"
                >
                  More about {service.title}
                </Link>
              </div>
            </section>

            <Cross />
          </div>
        ))}
      </div>
      {/* tasks__wrapper */}

      {/* // TODO: this is poor naming */}
      <div className="page">
        <h2 className="centered">Industry Suppliers</h2>
      </div>

      <div className="diatomic-wrapper">
        {data.allStrapiIndustry.nodes.map((industry: {
          id: string;
          slug: string;
          cover: {
            localFile: { childImageSharp: { gatsbyImageData: IGatsbyImageData; }; };
            alternativeText: string;
          };
          title: string;
          byline: string;
        }) => (
          <section key={industry.id} className="diatomic-card">
            <Link
              to={`/industry/${industry.slug}`}
              className="diatomic-card__image"
            >
              <GatsbyImage
                image={
                  industry.cover?.localFile?.childImageSharp
                    ?.gatsbyImageData
                }
                alt={industry.cover?.alternativeText}
                className="diatomic-card__image"
              />
            </Link>

            <section className="diatomic-card__text">
              <div className="diatomic-card__text--container">
                <h3 className="">
                  <Link to={`/industry/${industry.slug}`}>
                    {industry.title}
                  </Link>
                </h3>
                <h4 className="industry__byline">{industry.byline}</h4>

                <Link
                  to={`/industry/${industry.slug}`}
                  className="diatomic-card__text--more"
                >
                  More about {industry.title}
                </Link>
              </div>{/* diatomic-card__text--container */}
            </section>{/* diatomic-card__text */}
          </section>
        ))}
      </div>
      <Cross />

      <section id="map" className="">
        <Map />
      </section>

      <Testimonials />
      <Footer />
    </>
  );
};

export default IndexPage;

export const Head = () => (
  <>
    <SEO
      title={`${useSiteMetadata().title} | ${useSiteMetadata().description}`}
    />
  </>
);
