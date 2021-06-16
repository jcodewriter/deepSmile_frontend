import { gql } from "@apollo/client";

export const CONTACT = gql`
  mutation createContactFormEntry(
    $fullName: String
    $phone: String
    $email: String
    $message: String!
  ) {
    createContactFormEntry(fullName: $fullName, phone: $phone, email: $email, message: $message) {
      fullName
      phone
      email
      message
    }
  }
`;
