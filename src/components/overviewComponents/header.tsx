import { Header, Overview, Rectangle25, Name, Photo, Initials} from './style.js'

const OverviewHeader = () => {
	return (
		<Header>
			<Overview>{'Overview'}</Overview>
			<Rectangle25></Rectangle25>
			<Name>{'Juan Dela Cruz'}</Name>
			<Photo>
				<Initials>{'JD'}</Initials>
			</Photo>
		</Header>
	)
}

export default OverviewHeader
