import { Link } from 'components/Link';
import { StoryContainer } from '../../../.storybook/StoryContainer';

export default {
  title: 'Link',
};

export const Default = () => (
  <StoryContainer style={{ fontSize: 18 }}>
    <Link href="https://azizii.my.id">Primary link</Link>
    <Link secondary href="azizii.my.id">
      Secondary link
    </Link>
  </StoryContainer>
);
