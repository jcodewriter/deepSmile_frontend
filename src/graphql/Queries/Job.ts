import { JOB_FRAGMENT } from "src/graphql/fragments";
import { gql } from "@apollo/client";

export const GET_JOB = gql`
    query job($where: JobWhereUniqueInput!) {
        job(where: $where) ${JOB_FRAGMENT}
    }
`;
