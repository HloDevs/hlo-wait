import React from 'react'
import Link from "next/link";
import { Icon } from '@iconify/react';
import Div from '../Div';

export default function SocialWidget(
  { linkedin, twitter, youtube, facebook }
) {
  return (
    <Div className="cs-social_btns cs-style1">
      {
        linkedin && (
          <Link
            href={linkedin}
            className="cs-center"
          >
            <Icon icon="fa6-brands:linkedin-in" />
          </Link>
        )
      }
      {
        twitter && (
          <Link
            href={twitter}
            className="cs-center"
          >
            <Icon icon="fa6-brands:twitter" />
          </Link>
        )
      }
      {
        youtube && (
          <Link
            href={youtube}
            className="cs-center"
          >
            <Icon icon="fa6-brands:youtube" />
          </Link>
        )
      }
      {
        facebook && (
          <Link
            href={facebook}
            className="cs-center"
          >
            <Icon icon="fa6-brands:facebook-f" />
          </Link>
        )
      }
    </Div>
  )
}
