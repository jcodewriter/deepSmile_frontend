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
    title: "Documents contractuels",
  },
  {
    title: "Prérequis",
    children: ["Capacité juridique", "Compatibilité matérielle"],
  },
  {
    title: "Souscription des Services",
  },
  {
    title: "Entrée en vigueur – durée",
  },
  {
    title: "Opposabilité – Modification du Contrat",
  },
  {
    title: "Mise à disposition des Services",
    children: [
      "Périmètre",
      "Conformité",
      "Assistance au démarrage et formation",
      "Accès et utilisation des Services",
      "Suspension des Services",
      "Evolution des Services",
    ],
  },
  {
    title: "Obligations du Client",
    children: [
      "Obligations dans le cadre de l’utilisation des Services",
      "Amélioration de la Solution et dees",
      "Respect des droits des patients",
    ],
  },
  {
    title: "Propriété",
  },
  {
    title: "Maintenance du service",
    children: ["Assistance", "Maintenance corrective", "Maintenance évolutiv", "Exclusions"],
  },
  {
    title: "Hébergement",
  },
  {
    title: "Protection des Données personnelles",
  },
  {
    title: "Contrepartie des Services",
    children: ["Prix", "Evolution du prix", "Délais et modalités de paiement"],
  },
  {
    title: "Garanties",
    children: ["Garantie réciproque de jouissance paisible", "Garantie de disponibilité"],
  },
  {
    title: "Responsabilité",
    children: ["Responsabilité du Prestataire", "Responsabilité du Client"],
  },
  {
    title: "Force majeure",
  },
  {
    title: "Assurances",
  },
  {
    title: "Sous-traitance",
  },
  {
    title: "Confidentialité",
  },
  {
    title: "Résiliation",
    children: ["Résiliation pour faute", "Résiliation de l’abonnement"],
  },
  {
    title: "Conséquence de la fin du Contrat",
  },
  {
    title: "Dispositions générales",
    children: [
      "Références commerciales",
      "Preuve",
      "Tolérance",
      "Sincérité",
      "Indépendance des Parties",
      "Titres",
      "Nullité",
      "Intégralité",
      "Cession du Contrat",
      "Domiciliation",
      "Loi applicable",
      "Indivisibilité",
      "Prescription",
      "Clause attributive de compétence",
    ],
  },
  {
    title: "Liste des annexes",
  },
];

const UdiniTermsAndConditionsTreeView = () => {
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
            text={t(`udiniTermsAndConditions:title ${index + 1}`)}
          />
          {article.children &&
            article.children.map((subTitle, sIndex) => (
              <UdiniTermsSubTitleLink
                key={subTitle}
                href={`${index + 1}.${sIndex + 1}`}
                text={t(`udiniTermsAndConditions:subtitle ${index + 1}-${sIndex + 1}`)}
              />
            ))}
        </Fragment>
      ))}
    </Stack>
  );
};

export default UdiniTermsAndConditionsTreeView;
