import { Typography } from '@/components/ui/Typography';
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from '@/components/ui/accordion';
import { buttonVariants } from '@/components/ui/button';
import { prisma } from '@/lib/prisma';
import { cn } from '@/lib/utils';
import Image from 'next/image';
import Link from 'next/link';

const FAQValues = [
  {
    question: "Quelles sont les limites pour la consultation de cours sur JustLearn ?",
    answer:
      "Avec JustLearn, les seules limites sont votre disponibilité d'apprendre sur justLearn.",
  },
  // {
  //   question: "Puis-je intégrer des quiz ou des exercices dans mes cours sur JustLearn ?",
  //   answer:
  //     "Absolument ! JustLearn prend en charge l'intégration de différents types d'activités interactives telles que des quiz, des exercices de codage, et plus encore.",
  // },
  {
    question: "Comment JustLearn assure-t-il la qualité des cours proposés ?",
    answer:
      "Je vous partage de que j'ai appris. c'est pourquoi je suis ouvert pour toute contribution",
  },
  // {
  //   question: "JustLearn propose-t-il des outils de suivi pour les créateurs de cours ?",
  //   answer:
  //     "Oui, nous fournissons des analyses détaillées afin que vous puissiez suivre la progression et l'engagement de vos étudiants avec vos cours.",
  // },
  // {
  //   question: "Puis-je personnaliser l'apparence de mes cours sur JustLearn?",
  //   answer:
  //     "Oui, JustLearn propose des options de personnalisation pour que vous puissiez aligner l'apparence de vos cours avec votre marque ou vos préférences personnelles.",
  // },
  {
    question:
      "Quel support JustLearn fournit-il aux apprenants de contenu en cas de problèmes ?",
    answer:
      "Le support sera bientôt disponible",
  },

];

export default async function Home() {
  await prisma.course.findMany({
    include: {
      lessons: {
        include: {
          users: true,
        },
      },
    },
  });

  return (
    <div>
      {/* HERO */}
      <div className="m-auto my-8 flex max-w-5xl flex-col items-center gap-4 px-6 lg:my-16 lg:flex-row xl:my-24 xl:gap-8">
        <div className="flex flex-1 flex-col gap-4 lg:gap-6">
          <h1 className="bg-gradient-to-r from-blue-400 to-blue-600 bg-clip-text text-5xl font-extrabold text-transparent">
            Découvrez un monde de connaissances !
          </h1>
          <h2 className="text-xl">
            Bienvenue sur JustLearn, votre destination ultime pour l&rsquo;apprentissage ! Vous trouverez du contenu interactifs, des projets passionnants et bien plus encore.
          </h2>
          {/* <div className="flex items-center gap-8">
            <div className="flex">
              {Array.from({ length: 8 }).map((_, i) => (
                <Avatar key={i} className="-mr-4">
                  <AvatarFallback>{i + 1}</AvatarFallback>
                  <AvatarImage src={`/images/review/${(i % 4) + 1}.png`} />
                </Avatar>
              ))}
            </div>
            <div className="flex flex-col gap-0.5 text-yellow-500 dark:text-yellow-400">
              <p className="whitespace-nowrap  font-extrabold">
                +500 teachers trust us.
              </p>
              <div className="flex items-center gap-0.5">
                {Array.from({ length: 5 }).map((_, i) => (
                  <Star key={i} size={32} fill="currentColor" />
                ))}
              </div>
            </div>
          </div> */}
        </div>
        <div>
          <Image
            className='rounded-md'
            src="/images/learn.svg"
            width={400}
            height={15}
            alt="app logo"
          />
        </div>
      </div>
      {/* VALUES */}
      <div className="bg-primary py-8 text-primary-foreground xl:py-16">
        <div className="m-auto flex max-w-5xl flex-col gap-3 px-6 xl:flex-row xl:gap-6">
          <div className="flex flex-1 flex-col items-center gap-2 text-center">
            {/* <PencilLine size={32} /> */}
            <Typography variant="h3">Basé sur MDX</Typography>
            <Typography variant="large">
              JustLearn est basé sur MDX. Vous pouvez écrire vos cours en Markdown et en React.
            </Typography>
          </div>
          <div className="flex flex-1 flex-col items-center gap-2 text-center">
            {/* <CircleDollarSign size={32} /> */}
            <Typography variant="h3">Facile d&rsquo;utilisation</Typography>
            <Typography variant="large">
              Vous pouvez suivre vos cours gratuitement ? L&rsquo;utilisation de JustLearn est gratuite.
            </Typography>
          </div>
          <div className="flex flex-1 flex-col items-center gap-2 text-center">
            {/* <Rocket size={32} /> */}
            <Typography variant="h3">NextReact project</Typography>
            <Typography variant="large">
              Reconstruisez cette application à partir de zéro en {' '}
              <Link
                href="https://codelynx.dev/nextreact/courses"
                className="underline"
              >
                NextReact
              </Link>
            </Typography>
          </div>
        </div>
      </div>
      {/* CTA */}
      <div className="my-8 flex flex-col items-center gap-4 lg:my-16 xl:my-24">
        <h2 className="bg-gradient-to-r from-blue-400 to-blue-600 bg-clip-text text-4xl font-extrabold text-transparent">
          Commence à apprendre dès maintenant
        </h2>
        <Link
          href="/explorer"
          className={cn(buttonVariants(), 'px-6 py-8 text-xl font-bold')}
        >
          CONSULTER VOTRE PREMIER COURS
        </Link>
      </div>
      {/* FAQ */}
      <div
        className="bg-secondary py-8 text-secondary-foreground xl:py-16"
        style={{
          // @ts-ignore
          '--border': '240 3.7% 25%',
        }}
      >
        <div className="m-auto flex max-w-5xl flex-col gap-3 px-6 xl:gap-6">
          <h2 className="text-4xl font-extrabold">FAQ</h2>
          <Accordion type="single" collapsible className="w-full">
            {FAQValues.map((value, i) => (
              <AccordionItem value={i + value.question} key={i}>
                <AccordionTrigger>{value.question}</AccordionTrigger>
                <AccordionContent>{value.answer}</AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        </div>
      </div>
      {/* CTA */}
      {/* <div className="my-8 flex flex-col items-center gap-4 lg:my-16 xl:my-24">
        <h2 className="bg-gradient-to-r from-red-400 to-pink-600 bg-clip-text text-4xl font-extrabold text-transparent">
          Try it ! It&rsquo;s free
        </h2>
        <Link
          href="/admin/courses/new"
          className={cn(buttonVariants(), 'px-6 py-8 text-xl font-bold')}
        >
          REDIGER VOTRE PREMIER
        </Link>
      </div> */}
    </div>
  );
}