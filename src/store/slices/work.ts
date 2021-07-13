import create from "zustand";


export type WorkExperience = {
    title: string,
    occupation: string,
    content: {
        subTitle: string,
        subContent: string[]
    }[]
}

export type ProjectInfo = {
    title: string,
    occupation: string,
    content: {
        subTitle: string,
        subContent: string[]
    }[]
}

type WorkInfo = {
    experience: WorkExperience[],
    projects?: ProjectInfo[],
}

const workStore = create<WorkInfo>((set, get) => ({
    experience: [
        {
            title: "Amazon",
            occupation: "Software Developer Intern",
            content: [
                {
                    subTitle: "May 2018 - August 2018 (Term II)",
                    subContent: [
                        "Modified an open-source, self-driving RC car project to use Apache Mxnet over the existing Keras/Tensorflow machine learning framework",
                        "Documented performance of various modified models for online recreational publicity of the framework on Medium",
                        "Trained the models using AWS services (EC2 instances, Sagemaker) with online and personal datasets",
                        "Assisted in developing a Docker image of MxNet for Raspberry Pi for faster deployment"
                    ]
                },
                {
                    subTitle: "September 2017 - December 2017 (Term I)",
                    subContent: [
                        "Created a full-stack service as an internal tool for business teams to perform CRUD operations on Amazon’s Dynamo Database.",
                        "Regularly communicated with various teams to define the requirements of the product, such as authorization checks, business logic and UI design.",
                        "Worked in Java using Amazon’s modified Spring framework, and Javascript for UI",
                    ]
                }
            ]
        },
        {
            title: "SAP",
            occupation: "Software Developer Intern",
            content: [
                {
                    subTitle: "May 2019 - Decemeber 2019",
                    subContent: [
                        "Developed the automatic categorization of IT issue tickets/emails via SAP’s Machine Learning platform Leonardo.",
                        "Used NLTK/Spacy to process emails/tickets of their irrelevant info such as headers, disclaimers, personal/private information, etc.",
                        "Devised/implemented a microservices architecture to submit the tickets via an authorized API endpoint to process and categorize tickets, complete with logging and circuit breaker design.",
                        "Created a private UI for the administrative party on React, with automatic builds and test reports and builds via Jenkins."
                    ]
                },
            ]
        },
        {
            title: "Animal Logic",
            occupation: "Software Developer",
            content: [
                {
                    subTitle: "Janurary 2021 - Present",
                    subContent: [
                        "Developed scripts and daemons to maintain cross-site data for production staff's tools and platforms across Vancouver and Syndey.",
                        "Oversaw and maintained multiple linux machines with logging and analytics",
                        "Drafted and implemened tools for production staff to view/sync production assets.",
                        "Improved proprietary software with revamped software design/architecture with AWS tools/frameworks."
                    ]
                },
            ]
        }
    ]
}))

export default workStore
