import { sendMail } from "@/lib/mailgun";
import React from "react";

const getInvitationInfo = async (invitationToken: string) => {
	const response = await fetch(
		`${process.env.API_URL}/api/invitations?filters[token][$eq]=${invitationToken}&populate=*`,
		{
			headers: {
				Authorization: `Bearer ${process.env.API_TOKEN}`,
			},
		}
	);
	const result = await response.json();
	return result;
};
const Page = async ({ searchParams }: { searchParams: any }) => {
	const invitationToken = searchParams?.token;
	const invitationInfo = await getInvitationInfo(invitationToken);

	return (
		<div>
			<h2 className="text-5xl text-center">Register page</h2>
		</div>
	);
};

export default Page;
