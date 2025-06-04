import clsx from 'clsx'
import Link from 'next/link'
import Markdown from 'react-markdown'
import { AwesomeCard } from '~/components/awesome-card'
import { ProjectCard } from '~/components/project-card'
import { ResumeCard } from '~/components/resume-card'
import { Avatar, AvatarFallback, AvatarImage } from '~/components/ui/avatar'
import { Badge } from '~/components/ui/badge'
import BlurFade from '~/components/ui/blur-fade'
import BlurFadeText from '~/components/ui/blur-fade-text'
import { DATA } from '~/config'

const BLUR_FADE_DELAY = 0.04

export default function Page() {
  const DATA_EN = DATA

  return (
    <div className='mx-auto max-w-2xl px-6 py-12 sm:py-24'>
      <main className='flex min-h-[100dvh] flex-col space-y-10 pb-40'>
        <section id='hero'>
          <div className='mx-auto w-full max-w-2xl space-y-8'>
            <div className='flex justify-between gap-2'>
              <div className='flex flex-1 flex-col space-y-1.5'>
                <BlurFadeText
                  delay={BLUR_FADE_DELAY}
                  className='font-bold text-3xl tracking-tighter sm:text-5xl xl:text-6xl/none'
                  yOffset={8}
                  text={`Hi, I'm ${DATA_EN.name.split(' ')[0]} 👋`}
                />
                <BlurFadeText
                  className='max-w-[600px] md:text-xl'
                  delay={BLUR_FADE_DELAY}
                  text={DATA_EN.description}
                />
              </div>
              <BlurFade delay={BLUR_FADE_DELAY}>
                <Avatar className='size-28'>
                  <AvatarImage
                    alt={DATA_EN.name}
                    src={DATA_EN.avatarUrl}
                  />
                  <AvatarFallback>{DATA_EN.name[0]}</AvatarFallback>
                </Avatar>
              </BlurFade>
            </div>
          </div>
        </section>
        <section id='about'>
          <BlurFade delay={BLUR_FADE_DELAY * 3}>
            <h2 className='font-bold text-xl'>About</h2>
          </BlurFade>
          <BlurFade delay={BLUR_FADE_DELAY * 4}>
            <Markdown
              className='prose dark:prose-invert max-w-full text-pretty font-sans text-muted-foreground text-sm'
            >
              {DATA_EN.summary}
            </Markdown>
          </BlurFade>
        </section>
        <section id='work'>
          <div className='flex min-h-0 flex-col gap-y-3'>
            <BlurFade delay={BLUR_FADE_DELAY * 5}>
              <h2 className='font-bold text-xl'>Work</h2>
            </BlurFade>
            {DATA_EN.work.map((work, id) => (
              <BlurFade
                key={work.company}
                delay={BLUR_FADE_DELAY * 6 + id * 0.05}
              >
                <ResumeCard
                  key={work.company}
                  logoUrl={work.logoUrl}
                  altText={work.company}
                  title={work.company}
                  subtitle={work.title}
                  href={work.href}
                  badges={work.badges}
                  period={`${work.start} - ${work.end ?? 'Present'}`}
                  description={work.description}
                />
              </BlurFade>
            ))}
          </div>
        </section>
        <section id='education'>
          <div className='flex min-h-0 flex-col gap-y-3'>
            <BlurFade delay={BLUR_FADE_DELAY * 7}>
              <h2 className='font-bold text-xl'>Education</h2>
            </BlurFade>
            {DATA_EN.education.map((education, id) => (
              <BlurFade
                key={education.school}
                delay={BLUR_FADE_DELAY * 8 + id * 0.05}
              >
                <ResumeCard
                  key={education.school}
                  href={education.href}
                  logoUrl={education.logoUrl}
                  altText={education.school}
                  title={education.school}
                  subtitle={education.degree}
                  period={`${education.start} - ${education.end}`}
                  description={education.description}
                />
              </BlurFade>
            ))}
          </div>
        </section>
        <section id='skills'>
          <div className='flex min-h-0 flex-col gap-y-3'>
            <BlurFade delay={BLUR_FADE_DELAY * 9}>
              <h2 className='font-bold text-xl'>Skills</h2>
            </BlurFade>
            <div className='flex flex-wrap gap-1'>
              {DATA_EN.skills.map((skill, id) => (
                <BlurFade
                  key={skill}
                  delay={BLUR_FADE_DELAY * 10 + id * 0.05}
                >
                  <Badge key={skill}>{skill}</Badge>
                </BlurFade>
              ))}
            </div>
          </div>
        </section>
        <section id='projects'>
          <div className='w-full space-y-12 py-12'>
            <BlurFade delay={BLUR_FADE_DELAY * 11}>
              <div className='flex flex-col items-center justify-center space-y-4 text-center'>
                <div className='space-y-2'>
                  <div className='inline-block rounded-lg bg-foreground px-3 py-1 text-background text-sm'>
                    Projects
                  </div>
                  <h2 className='font-bold text-3xl tracking-tighter sm:text-5xl'>Check my work</h2>
                  <p className='text-muted-foreground md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed'>
                    Here are some of my recent projects.
                  </p>
                </div>
              </div>
            </BlurFade>
            <div className='mx-auto grid max-w-[800px] grid-cols-1 gap-3 sm:grid-cols-2'>
              {DATA_EN.projects.map((project, id) => (
                <BlurFade
                  key={project.title}
                  delay={BLUR_FADE_DELAY * 12 + id * 0.05}
                >
                  <ProjectCard
                    href={project.href}
                    key={project.title}
                    title={project.title}
                    description={project.description}
                    dates={project.dates}
                    tags={project.technologies}
                    image={project.image}
                    video={project.video}
                    links={project.links}
                  />
                </BlurFade>
              ))}
            </div>
          </div>
        </section>
        <section id='awesome'>
          <div className='w-full space-y-12 py-12'>
            <BlurFade delay={BLUR_FADE_DELAY * 13}>
              <div className='flex flex-col items-center justify-center space-y-4 text-center'>
                <div className='space-y-2'>
                  <div className='inline-block rounded-lg bg-foreground px-3 py-1 text-background text-sm'>
                    Awesome
                  </div>
                  <h2 className='font-bold text-3xl tracking-tighter sm:text-5xl'>Building things</h2>
                  <p className='text-muted-foreground md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed'>
                    Some other things I have done.
                  </p>
                </div>
              </div>
            </BlurFade>
            <BlurFade delay={BLUR_FADE_DELAY * 14}>
              <ul className='mb-4 ml-4 divide-y divide-dashed border-l'>
                {DATA_EN.awesome.map((project, id) => (
                  <BlurFade
                    key={project.title + project.dates}
                    delay={BLUR_FADE_DELAY * 15 + id * 0.05}
                  >
                    <AwesomeCard
                      title={project.title}
                      description={project.description}
                      location={project.location}
                      dates={project.dates}
                      image={project.image}
                      links={project.links}
                    />
                  </BlurFade>
                ))}
              </ul>
            </BlurFade>
          </div>
        </section>

        <section id='contact'>
          <div className='grid w-full items-center justify-center gap-4 px-4 py-12 text-center md:px-6'>
            <BlurFade delay={BLUR_FADE_DELAY * 16}>
              <div className='space-y-6'>
                <div className='inline-block rounded-lg bg-foreground px-3 py-1 text-background text-sm'>
                  Contact
                </div>
                <h2 className='font-bold text-3xl tracking-tighter sm:text-5xl'>Get in touch</h2>
                <p className='mx-auto max-w-[600px] text-muted-foreground md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed'>
                  Want to chat? Shoot me a message on{' '}
                  <Link
                    href={DATA_EN.contact.social.Telegram.url}
                    className='text-blue-500 hover:underline'
                    data-umami-event='contact-telegram-link'
                  >
                    Telegram
                  </Link>{' '}and I will respond!
                </p>

              </div>
            </BlurFade>
          </div>
        </section>
      </main>
    </div>
  )
}
