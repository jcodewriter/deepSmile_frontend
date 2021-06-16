import { Stack } from "@chakra-ui/core";
import useTranslation from "next-translate/useTranslation";
import React, { Fragment } from "react";
import { UdiniTermsTitleLink, UdiniTermsSubTitleLink } from "./Typography";

const TREE = [
  {
    title: "Préambule",
  },
  {
    title: "Définitions",
  },
  {
    title: "Objet",
  },
  {
    title: "Prérequis",
    children: ["Capacité juridique et professionnelle", "Compatibilité matérielle", "Prérequis"],
  },
  {
    title: "Acceptation et opposabilité des CGU",
    children: ["Acceptation", "Opposabilité", "Modification"],
  },
  {
    title: "Accès aux Services",
    children: ["Procédure d’accès", "Gestion du mot de passe", "Disponibilité"],
  },
  {
    title: "Durée - Suspension et fermeture de l’accès aux Services",
    children: [
      "Durée des CGU",
      "Suspension ou fermeture",
      "Conséquences de la suspension ou de la fermeture de l’accès aux Services",
    ],
  },
  {
    title: "Description des Services",
  },
  {
    title: "Obligations de l’Utilisateur",
    children: [
      "Principes d’utilisation",
      "Information sur sa situation",
      "Soins dispensés aux patients",
      "Amélioration du Portail et des Services",
      "Respect des droits des usagers et des patients",
    ],
  },
  {
    title: "Responsabilité du Prestataire",
  },
  {
    title: "Protection des données à caractère personnel",
    children: ["Prestataire responsable de traitement", "Prestataire sous-traitant"],
  },
  {
    title: "Droit de propriété intellectuelle",
    children: ["Eléments du Prestataire", "Eléments de tiers"],
  },
  {
    title: "Liens hypertextes",
  },
  {
    title: "Assurance",
  },
  {
    title: "Dispositions générales",
    children: ["Notification et réclamation", "Tolérance", "Nullité", "Loi applicable"],
  },
];

const UdiniTermsOfUseTreeView = () => {
  const { t } = useTranslation();

  return (
    <Stack
      as="section"
      display={{ base: "none", md: "flex" }}
      spacing="21px"
      paddingTop="120px"
      paddingLeft={{ base: "50px", md: "80px" }}
      paddingBottom="20px"
      bg="white"
    >
      {TREE.map((article, index) => (
        <Fragment key={article.title}>
          <UdiniTermsTitleLink
            href={`${index + 1}`}
            text={t(`udiniTermsOfUse:title ${index + 1}`)}
          />
          {article.children &&
            article.children.map((subTitle, sIndex) => (
              <UdiniTermsSubTitleLink
                key={subTitle}
                href={`${index + 1}.${sIndex + 1}`}
                text={t(`udiniTermsOfUse:subtitle ${index + 1}-${sIndex + 1}`)}
              />
            ))}
        </Fragment>
      ))}
    </Stack>
  );
};

export default UdiniTermsOfUseTreeView;
