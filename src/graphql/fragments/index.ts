const JOB_FRAGMENT = `
{
  id
  progress
  urlZip
  inputImages {
    id
    url
    filename
  }
  processedImages {
    id
    idOriginalImage
    url
    type
  }
}
`;

const USER_FRAGMENT = `
{
      email
      statePlan
      logo
      infos {
        firstName
        lastName
        gender
        softwareName
        hearAboutUs
        address
        zipcode
        country
        phone
        company
        city
        newsletter
      }
      billingInfos {
        firstName
        lastName
        address
        zipcode
        country
        city
        phone
        company
      }
      customizationParameters {
        useMirror
        useMirrorOcclusal
        faceZoomLevel
        faceBackgroundColor
        occlusalCut
        intraOralZoomLevel
        autoSoftwareFlip
      }
      planInfos {
        numberOfPhotosUsed
        numberOfPhotosInPlan
        plan
        plan2
        nextBilling
        invoices {
          date
          url
          amount
          currency
          paid
        }
        card {
          exp_month
          exp_year
          last4
        }
      }
    }
`;

export { JOB_FRAGMENT, USER_FRAGMENT };
