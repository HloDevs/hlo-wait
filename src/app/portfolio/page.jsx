'use client'
import CaseStudy from "@/app/ui/CaseStudy";
import Cta from "@/app/ui/Cta";
import Div from "@/app/ui/Div";
import Hero3 from "@/app/ui/Hero/Hero3";
import LogoList from "@/app/ui/LogoList";
import MovingText from "@/app/ui/MovingText";
import Portfolio2 from "@/app/ui/Portfolio/Portfolio2";
import Portfolio3 from "@/app/ui/Portfolio/Portfolio3";
import SectionHeading from "@/app/ui/SectionHeading";
import TestimonialSlider from "@/app/ui/Slider/TestimonialSlider";
import Spacing from "@/app/ui/Spacing";

const heroSocialLinks = [
  {
    name: 'Behance',
    links: '/',
  },
  {
    name: 'Twitter',
    links: '/',
  },
];
const portfolioData = [
  {
    title: 'Winery eCommerce website design & development',
    subtitle: 'Project 01',
    btnText: 'See Details',
    btnLink: '/portfolio/portfolio-details',
    imageUrl: '/images/portfolio_35.jpeg',
    category: 'Web Development',
  },
  {
    title: 'Euro corporate agency for healthy environment',
    subtitle: 'Project 02',
    btnText: 'See Details',
    btnLink: '/portfolio/portfolio-details',
    imageUrl: '/images/portfolio_36.jpeg',
    category: 'Branding',
  },
  {
    title: 'Powerful admin dashboard design',
    subtitle: 'Project 03',
    btnText: 'See Details',
    btnLink: '/portfolio/portfolio-details',
    imageUrl: '/images/portfolio_37.jpeg',
    category: 'UI Design',
  },
  {
    title: 'Crypto financial trading apps for hedge fund',
    subtitle: 'Project 04',
    btnText: 'See Details',
    btnLink: '/portfolio/portfolio-details',
    imageUrl: '/images/portfolio_38.jpeg',
    category: 'Apps Design',
  },
];

export default function CreativePortfolioHome() {
  return (
    <>
      {/* Start Hero Section */}
      <Hero3
        title="Arino Creative <br />Portfolio"
        btnLink="contact"
        btnText={`Let's talk`}
        socialLinksHeading="Follow Us"
        heroSocialLinks={heroSocialLinks}
        bgImageUrl="/images/hero_bg_4.jpeg"
      />
      {/* End Hero Section */}

      {/* Start Portfolio Section */}
      <Spacing lg="150" md="80" />
      {portfolioData.map((item, index) =>
        index % 2 === 0 ? (
          <Div key={index}>
            <Portfolio2
              title={item.title}
              subtitle={item.subtitle}
              btnText={item.btnText}
              btnLink={item.btnLink}
              imageUrl={item.imageUrl}
              category={item.category}
            />
            <Spacing lg="100" md="70" />
          </Div>
        ) : (
          <Div key={index}>
            <Portfolio3
              title={item.title}
              subtitle={item.subtitle}
              btnText={item.btnText}
              btnLink={item.btnLink}
              imageUrl={item.imageUrl}
              category={item.category}
            />
            <Spacing lg="100" md="70" />
          </Div>
        ),
      )}
      {/* End Portfolio Section */}

      {/* Start CTA Section */}
      <Div className="container">
        <Cta
          title="Let's disscuse make <br />something <i>cool</i> together"
          btnText="Apply For Meeting"
          btnLink="/contact"
          bgSrc="/images/cta_bg_3.jpeg"
        />
      </Div>
      {/* End CTA Section */}
    </>
  );
}
