import { FrontPageConfig } from "#/types";
import { GetServerSideProps } from "next";
import { axiosInstance } from "#/utils/axios";
import LandingPage, { LandingPageProps } from "@/modules/landing";

export default LandingPage;

export const getServerSideProps: GetServerSideProps<
  LandingPageProps
> = async () => {
  try {
    const { data: frontPageConfig } = await axiosInstance.get<FrontPageConfig>(
      "/front-page"
    );
    return {
      props: {
        frontPageConfig,
      },
    };
  } catch (e) {
    return {
      props: {
        frontPageConfig: {},
      },
    };
  }
};
