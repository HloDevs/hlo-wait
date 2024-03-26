'use client'
import Cta from "@/app/ui/Cta"
import Div from "@/app/ui/Div"
import PageHeading from "@/app/ui/PageHeading"
import Spacing from "@/app/ui/Spacing"
import SocialWidget from "@/app/ui/Widget/SocialWidget"
import imgUrl from '../../../../public/images/member_details_1.jpeg'
import Image from "next/image"
import userInfo from "../userInfo.json"

export default function TeamDetails({ params }) {

  const userLink = params.teamDetailsId;

  const teamMember = userInfo.team.find((item) => item.link === "/team/" + userLink);

  return (
    <>
      <PageHeading
        title='Team Details'
        bgSrc='/images/team_hero_bg.jpeg'
        pageLinkText='Team Details'
      />
      <Spacing lg='150' md='80' />
      <Div className="container">
        <Div className="row align-items-center">
          <Div className="col-xl-5 col-lg-6">
            <Div className="cs-radius_15 cs-shine_hover_1">
              <Image src={teamMember.image} alt="Member" width={532} height={618} className="w-100" />
            </Div>
          </Div>
          <Div className="col-lg-6 offset-xl-1">
            <Spacing lg='0' md='45' />
            <Div className="cs-section_heading cs-style1">
              <h2 className="cs-section_title">{teamMember.name}</h2>
              <Div className="cs-height_10 cs-height_lg_10" />
              <h3 className="cs-section_subtitle">{teamMember.designation}</h3>
              <Div className="cs-height_5 cs-height_lg_5" />
              <Div className="cs-separator cs-accent_bg" />
              <br />
              <p className="cs-m0">{teamMember.description}</p>
              <br />
              <SocialWidget
                linkedin={teamMember.social.linkedin}
                twitter={teamMember.social.twitter}
                youtube={teamMember.social.youtube}
                facebook={teamMember.social.facebook}
              />
            </Div>
          </Div>
        </Div>
      </Div>
      <Spacing lg='150' md='80' />
      <Div className="container">
        <Cta
          title="Let' s disscuse make <br />something <i>cool</i> together"
          btnText='Apply For Meeting'
          btnLink='/contact'
          bgSrc='/images/cta_bg.jpeg'
        />
      </Div>
    </>
  )
}
