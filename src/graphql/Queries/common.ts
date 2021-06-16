import { gql } from "@apollo/client";

export const GET_INFOS_FROM_IP = gql`
  query getInfosFromIp($ip: String) {
    getInfosFromIp(ip: $ip) {
      country
    }
  }
`;
