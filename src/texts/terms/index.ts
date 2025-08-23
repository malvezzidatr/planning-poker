import { IconName } from "@/components/Icon/Icon";

type Terms = {
  title: string;
  content: string;
  content2?: string;
  visualContent?: string;
  visualIcon?: IconName;
}

export const terms: Terms[] = [
  {
    title: "Introduction",
    content: "By accessing and using Planning Poker (\"the Service\"), you accept and agree to be bound by the terms and provisions of this agreement. If you do not agree to abide by these terms, please do not use this service.\nPlanning Poker is designed to facilitate agile estimation sessions for development teams. These terms ensure a fair and secure experience for all users."
  },
  {
    title: "User Responsibilities",
    content: `As a user of Planning Poker, you are responsible for:\n\n • Providing accurate information when creating or joining estimation sessions \n • Maintaining the confidentiality of room codes and sensitive project information\n • Using the service in a professional and respectful manner\n • Ensuring your internet connection and device meet the minimum requirements`
  },
  {
    title: "Account and Access Rules",
    content: `Planning Poker operates on a room•based system without traditional user accounts:\n\n • No registration required • access rooms using unique codes\n • Room creators have administrative privileges within their sessions \n • Sessions are temporary and data is not permanently stored\n • We reserve the right to terminate access for violations of these terms`
  },
  {
    title: "Acceptable Use Policy",
    content: "You agree not to use Planning Poker for:\n\n • Any unlawful purpose or activity prohibited by applicable laws\n • Transmitting harmful, offensive, or inappropriate content\n • Attempting to gain unauthorized access to our systems \n • Disrupting the service or interfering with other users' sessions\n • Commercial purposes without explicit written permission"
  },
  {
    title: "Limitation of Liability",
    content: "Planning Poker is provided \"as is\" without warranties of any kind. We shall not be liable for:\n\n • Any direct, indirect, incidental, or consequential damages\n • Loss of data, profits, or business opportunities\n • Service interruptions or technical difficulties\n • Actions or decisions made based on estimates from our platform"
  },
  {
    title: "Privacy and Data Usage",
    content: "We respect your privacy and handle data responsibly:\n\n",
    visualContent: "Data We Collect:\n • Names or usernames provided during sessions\n • Voting data and session interactions\n • Usage analytics to improve our service",
    content2: "We do not sell personal information to third parties. Session data is temporarily stored and automatically deleted after sessions end."
  },
  {
    title: "Changes to These Terms",
    content: "We reserve the right to modify these terms at any time. When we make changes:\n\n • We will update the \"Last updated\" date at the top of this page\n • Significant changes will be communicated through our service\n • Continued use constitutes acceptance of the updated terms"
  },
  {
    title: "Contact Information",
    content: "If you have questions about these terms or need support:\n",
    visualContent: "Email: malvezzi.dev@gmail.com",
    visualIcon: "email"
  }
]