"use client";
import Cta from "@/app/ui/Cta";
import Div from "@/app/ui/Div";
import FunFact from "@/app/ui/FunFact";
import Hero from "@/app/ui/Hero";
import LogoList from "@/app/ui/LogoList";
import MovingText from "@/app/ui/MovingText";
import Hero2 from "@/app/ui/Hero/Hero2";
import SectionHeading from "@/app/ui/SectionHeading";
import PortfolioSlider from "@/app/ui/Slider/PortfolioSlider";
import PostSlider from "@/app/ui/Slider/PostSlider";
import ServiceListStyle2 from "@/app/ui/ServiceList/ServiceListStyle2";
import TeamSlider from "@/app/ui/Slider/TeamSlider";
import TestimonialSlider from "@/app/ui/Slider/TestimonialSlider";
import TimelineSlider from "@/app/ui/Slider/TimelineSlider";
import Spacing from "@/app/ui/Spacing";
import VideoModal from "@/app/ui/VideoModal";
import Card from "./ui/Card";
import Team from "@/app/ui/Team";

const teamData = [
  {
    memberImage: "/images/member_1.jpeg",
    memberName: "Melon Bulgery",
    memberDesignation: "Product Designer",
    memberSocial: {
      linkedin: "/",
      twitter: "/",
      youtube: "/",
      facebook: "/",
    },
  },
  {
    memberImage: "/images/member_2.jpeg",
    memberName: "Olinaz Fushi",
    memberDesignation: "Product Designer",
    memberSocial: {
      linkedin: "/",
      twitter: "/",
      youtube: "/",
      facebook: "/",
    },
  },
  {
    memberImage: "/images/member_3.jpeg",
    memberName: "David Elone",
    memberDesignation: "React Developer",
    memberSocial: {
      linkedin: "/",
      twitter: "/",
      youtube: "/",
      facebook: "/",
    },
  },
  {
    memberImage: "/images/member_4.jpeg",
    memberName: "Melina Opole",
    memberDesignation: "WP Developer",
    memberSocial: {
      linkedin: "/",
      twitter: "/",
      youtube: "/",
      facebook: "/",
    },
  },
  {
    memberImage: "/images/member_3.jpeg",
    memberName: "David Elone",
    memberDesignation: "React Developer",
    memberSocial: {
      linkedin: "/",
      twitter: "/",
      youtube: "/",
      facebook: "/",
    },
  },
  {
    memberImage: "/images/member_4.jpeg",
    memberName: "Melina Opole",
    memberDesignation: "WP Developer",
    memberSocial: {
      linkedin: "/",
      twitter: "/",
      youtube: "/",
      facebook: "/",
    },
  }
];

// Hero Social Links
const heroSocialLinks = [
  {
    name: "Behance",
    links: "/",
  },
  {
    name: "Twitter",
    links: "/",
  },
];

const heroData = [
  {
    title: "Wedding",
    imageUrl: "/images/wedding.jpeg",
    href: "/service/service-details",
  },
  {
    title: "Fashion",
    imageUrl: "/images/fashion.jpeg",
    href: "/service/service-details",
  },
  {
    title: "Commercial",
    imageUrl: "/images/commercial.jpeg",
    href: "/service/service-details",
  },
  {
    title: "Landscape",
    imageUrl: "/images/landscape.jpeg",
    href: "/service/service-details",
  },
  {
    title: "Landscape",
    imageUrl: "/images/landscape.jpeg",
    href: "/service/service-details",
  },
];

// FunFact Data
const funfaceData = [
  {
    title: "Global Happy Clients",
    factNumber: "40K",
  },
  {
    title: "Project Completed",
    factNumber: "50K",
  },
  {
    title: "Team Members",
    factNumber: "245",
  },
  {
    title: "Digital products",
    factNumber: "550",
  },
];
// Portfolio Data
const portfolioData = [
  {
    title: "Colorful Art Work",
    subtitle: "See Details",
    href: "/portfolio/portfolio-details",
    src: "/images/portfolio_1.jpeg",
  },
  {
    title: "Colorful Art Work",
    subtitle: "See Details",
    href: "/portfolio/portfolio-details",
    src: "/images/portfolio_2.jpeg",
  },
  {
    title: "Colorful Art Work",
    subtitle: "See Details",
    href: "/portfolio/portfolio-details",
    src: "/images/portfolio_0.jpg",
  },
  {
    title: "Colorful Art Work",
    subtitle: "See Details",
    href: "/portfolio/portfolio-details",
    src: "/images/portfolio_3.jpeg",
  },
];

export default function Home() {
  return (
    <>
      {/* Start Hero Section */}
      <Hero
        title={
          '<div style="line-height:80px;">#Hlo Ventures<div></div><span style="font-size:40px">Since 2016</span></div>'
        }

        // content for a venture capitalist in a short and attractive way
        subtitle="At Hlo, we're dedicated to empowering Indian startups, propelling them onto the global stage and shaping the future of entrepreneurship together. Join us today!"
        btnText="Apply Now"
        btnLink="/contact"
        scrollDownId="#service"
        socialLinksHeading="Follow Us"
        heroSocialLinks={heroSocialLinks}
        bgImageUrl="/images/hero_bg.jpeg"
      />
      {/* End Hero Section */}

      {/* Start MovingText Section */}
      <Spacing lg="100" md="70" />
      <MovingText text="Our reputed world wide partners" />
      {/* End MovingText Section */}

      {/* Start LogoList Section */}
      <Spacing lg="100" md="70" />
      <Div className="container">
        <LogoList />
      </Div>
      {/* End LogoList Section */}

      {/* Start About Section */}
      <Spacing lg="100" md="80" />
      <Div className="container">
        <Div className="row">
          <Div className="col-xl-5 col-lg-7">
            <SectionHeading
              title="Our Commitment at Hlo Ventures"
              subtitle="About us"
            >
              <Spacing lg="30" md="20" />
              <p className="cs-m0">
                Welcome to Hlo Ventures, where we're dedicated to fostering the growth of Indian startups. Our sector-agnostic approach and long-term perspective enable us to support founders with bold visions. Through funding, mentorship, and access to resources, we're propelling Indian entrepreneurship to new heights on the global stage.
              </p>
              <Spacing lg="30" md="30" />
              <Div className="cs-separator cs-accent_bg"></Div>
              <Spacing lg="25" md="40" />
            </SectionHeading>
          </Div>
          <Div className="col-lg-5 offset-xl-2">
            <img
              src="/images/about_img_6.jpeg"
              alt="About"
              className="w-100 cs-radius_15"
            />
            <Spacing lg="25" md="25" />
          </Div>
          <Div className="col-lg-7">
            <img
              src="/images/about_img_7.jpeg"
              alt="About"
              className="w-100 cs-radius_15"
            />
            <Spacing lg="25" md="25" />
          </Div>
          <Div className="col-lg-5">
            <img
              src="/images/about_img_8.jpeg"
              alt="About"
              className="w-100 cs-radius_15"
            />
            <Spacing lg="25" md="25" />
          </Div>
        </Div>
      </Div>
      {/* End About Section */}


      {/* Start Portfolio Section */}
      <Spacing lg="100" md="70" />
      <Div>
        <Div className="container">
          <SectionHeading
            title="Portfolio to explore"
            subtitle="Latest Projects"
            variant="cs-style1 text-center"
          />
          <Spacing lg="90" md="45" />
        </Div>
        <PortfolioSlider data={portfolioData} />
      </Div>
      {/* End Portfolio Section */}

      {/* Start Team Section */}
      <Spacing lg="145" md="80" />

      <Div className="container">
        <SectionHeading
          title="Awesome team <br/>members"
          subtitle="Our Team"
          variant="cs-style1"
        />
        <Spacing lg="85" md="45" />
        <TeamSlider />
      </Div>
      <Spacing lg="70" md="50" />
      <Div className="container">
        <Cta
          title="Let's disscuse make <br />something <i>cool</i> together"
          btnText="Apply For Meeting"
          btnLink="/contact"
          bgSrc="/images/cta_bg.jpeg"
        />
      </Div>
      <Spacing lg="150" md="80" />
      {/* End Team Section */}
    </>
  );
}
