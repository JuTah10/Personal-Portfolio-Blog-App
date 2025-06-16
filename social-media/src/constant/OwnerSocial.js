import { FaGithub, FaLinkedin } from "react-icons/fa";
import { FiExternalLink } from "react-icons/fi";


import { MdOutlineEmail } from "react-icons/md";

export const OwnerSocials = [
    {
        name: "Website",
        link: "#",
        Icon: FiExternalLink,
        action: "Visit",
    },
    {
        name: "Email",
        link: "mailto:vn22dy@brocku.ca",
        Icon: MdOutlineEmail,
        action: "Email",
    },
    {
        name: "LinkedIn",
        link: "https://www.linkedin.com/in/vu-nguyen-5a739026b/",
        Icon: FaLinkedin,
        action: "Connect",
    },
    {
        name: "Github",
        link: "https://github.com/JuTah10",
        Icon: FaGithub,
        action: "View",
    },
];
