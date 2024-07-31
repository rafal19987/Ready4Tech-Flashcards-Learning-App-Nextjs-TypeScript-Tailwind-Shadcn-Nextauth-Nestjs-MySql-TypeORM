import Image from 'next/image';
import { Metadata } from 'next';
import Link from 'next/link';
import image from '@/assets/images/cv-review.jpg';
import { H2 } from '@components/shared/typography/H2';
import { P } from '@components/shared/typography/P';
import { H3 } from '@components/shared/typography/H3';
import { Small } from '@components/shared/typography/Small';
import { buttonVariants } from '@components/shared/Button';

export const metadata: Metadata = {
  title: 'Ready4Tech | About',
  description: 'About Ready4Tech SPA',
};

const AboutPage: React.FC = () => {
  return (
    <section className='space-y-8 pb-24'>
      <div className='space-y-4'>
        <div className='space-y-2'>
          <Small>Preper yourself</Small>
          <H2>Interviews are stressful</H2>
          <P className='leading-0 [&:not(:first-child)]:mt-0'>
            Have you ever been stressed before an exam? Stress accompanies us at
            every step, and if only we could feel confident.
          </P>
          <ul className='flex gap-2 w-full items-center'>
            <li className='w-fit px-2 rounded-sm border border-[#949494]'>
              <span className='text-sm text-[#545454]'>Confidence</span>
            </li>
            <li className='w-fit px-2 rounded-sm border border-[#949494]'>
              <span className='text-sm text-[#545454]'>Study</span>
            </li>
            <li className='w-fit px-2 rounded-sm border border-[#949494]'>
              <span className='text-sm text-[#545454]'>Programming</span>
            </li>
            <li className='w-fit px-2 rounded-sm border border-[#949494]'>
              <span className='text-sm text-[#545454]'>Interviews</span>
            </li>
          </ul>
        </div>

        <Image
          src={image}
          width={0}
          height={0}
          sizes='100vw'
          aria-hidden
          alt='cv interview image'
          priority
        />
      </div>
      <div className='space-y-8'>
        <article className='space-y-4'>
          <H3>The idea behind the App</H3>
          <P className='[&:not(:first-child)]:mt-0 w-11/12 lg:w-full text-justify'>
            The idea for Ready4Tech came about during my preparations for
            developer job interviews. I realized I lacked a tool tailored to my
            needs, so I created an application that allows for effective
            repetition of key concepts, which is crucial for success.
          </P>
        </article>
        <article className='space-y-4'>
          <H3>How the App Works?</H3>
          <P className='[&:not(:first-child)]:mt-0 w-11/12 lg:w-full text-justify'>
            Ready4Tech focuses on learning through repetition using flashcards
            with questions and answers. Users can choose from various question
            categories. Initially, only the question is displayed, prompting
            users to recall the answer from memory. After clicking a button, the
            answer is revealed, and users can decide whether to move on to the
            next question or keep it for further review. Each learning session
            is saved, allowing users to continue from where they left off.
          </P>
        </article>
        <article className='space-y-4'>
          <H3>Editing Categories and Questions</H3>
          <P className='[&:not(:first-child)]:mt-0 w-11/12 lg:w-full text-justify'>
            Editing, adding, and deleting entire categories or individual
            questions with answers is possible only when logged in as an Admin.
            Currently, the registration module for new users is disabled.
          </P>
        </article>
      </div>
      <div>
        <H3>Let`s Connect</H3>
        <P className='[&:not(:first-child)]:mt-0 w-11/12 lg:w-full text-justify'>
          If you want to get in touch with me about something or just say hi,
          reach out on social media or send me an emial
        </P>
        <ul className='flex gap-3'>
          <li>
            <Link
              href='https://github.com/'
              target='_blank'
              referrerPolicy='no-referrer'
              aria-label={`Linkedin profile of author`}
              className={buttonVariants({ variant: 'outline' })}
            >
              github
            </Link>
          </li>
          <li>
            <Link
              href='https://www.linkedin.com/'
              target='_blank'
              referrerPolicy='no-referrer'
              aria-label={`Linkedin profile of author`}
              className={buttonVariants({ variant: 'outline' })}
            >
              linkedin
            </Link>
          </li>
          <li>
            <Link
              href='mailto:rizdebski29@gmail.com'
              referrerPolicy='no-referrer'
              aria-label={`Email rizdebski29@gmail.com`}
              className={buttonVariants({ variant: 'outline' })}
            >
              rizdebski29@gmail.com
            </Link>
          </li>
        </ul>
      </div>
    </section>
  );
};

export default AboutPage;
