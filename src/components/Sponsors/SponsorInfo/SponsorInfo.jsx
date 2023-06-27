import PropTypes from "prop-types";
import AvatarContainer from "../../AvatarContainer/AvatarContainer";
import {
	ChatBubbleOvalLeftIcon,
	ClipboardDocumentIcon,
	PhoneIcon,
	StarIcon,
} from "@heroicons/react/24/solid";

function SponsorInfo(props) {
	const { data } = props;

	return (
		<div className="flex items-center justify-center">
			<div className="py-8 text-gray-dark">
				<div className="card p-8 w-[400px] text-center text-sm ">
					<h1 className="text-primary font-medium text-2xl text-center">
						{data.name}
					</h1>
					<div className="w-full h-[1px] bg-gray my-4" />
					<div>
						<SectionTitle title="Protocol Name/Number" />
						<p>lorem opsum dolor #00000</p>
					</div>

					<div>
						<SectionTitle title="Chief Medical Officer" />
						<p>Firstname Lastname</p>
						<p>anna@gmail.com</p>
						<p>999-555-00</p>
						<p>999-555-00</p>
					</div>

					<div>
						<SectionTitle title="Study Protocol" />
						<p>12345679</p>
					</div>

					<div>
						<SectionTitle title="Sites" />
						<p>SiteName</p>
						<p>123 N Circle CT</p>
						<p>Las Vegas NV, 899</p>
					</div>

					<div className="flex gap-4 justify-center items-center mt-6">
						<AvatarContainer Icon={PhoneIcon} />
						<AvatarContainer Icon={ChatBubbleOvalLeftIcon} />
						<AvatarContainer Icon={StarIcon} />
					</div>
				</div>

				{/* NOTES */}
				<div className="card p-8 w-[400px] mt-4">
					<div className="flex gap-2 items-center mb-4">
						<AvatarContainer Icon={ClipboardDocumentIcon} />
						<h4 className="text-primary font-medium text-xl">Notes</h4>
					</div>

					<div className="notes__description">
						<p>
							lorem ipsum hello workd jasjaklsds test mic whenecer i say hahssn
							lorem ipsum hello workd jasjaklsds test mic whenecer i say
							hahssnlorem ipsum hello workd jasjaklsds test mic whenecer i say
							hahssn lorem ipsum hello workd jasjaklsds test mic whenecer i say
							hahssnlorem ipsum hello workd jasjaklsds test mic whenecer i say
							hahssn
						</p>
					</div>
				</div>
			</div>
		</div>
	);
}

export default SponsorInfo;

SponsorInfo.propTypes = {
	data: PropTypes.object,
};

function SectionTitle(props) {
	const { title } = props;
	return (
		<h4 className="text-primary font-medium text-center text-lg mt-4">
			{title}
		</h4>
	);
}

SectionTitle.propTypes = {
	title: PropTypes.string,
};
