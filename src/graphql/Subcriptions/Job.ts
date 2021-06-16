import { gql } from "@apollo/client";
import { JOB_FRAGMENT } from "src/graphql/fragments";

const FOLLOW_JOB = gql`
  subscription followJob($idJob: ID!) {
    followJob(idJob: $idJob) ${JOB_FRAGMENT}
  }
`;

export { FOLLOW_JOB };
