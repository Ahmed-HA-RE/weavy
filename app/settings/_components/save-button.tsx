import { Button } from '@/components/ui/button';

interface SaveButtonProps {
  mode: 'mobile' | 'desktop';
  isSubmitting: boolean;
}

const SaveButton = ({ mode, isSubmitting }: SaveButtonProps) => {
  return (
    <Button
      type='submit'
      size='sm'
      disabled={isSubmitting}
      className={`ml-auto rounded-full px-4 text-sm ${mode === 'mobile' ? 'inline-flex lg:hidden' : 'hidden lg:inline-flex mb-2.5'}`}
    >
      {isSubmitting ? 'Saving...' : 'Save'}
    </Button>
  );
};

export default SaveButton;
