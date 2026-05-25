import { validateUsername } from '@/lib/actions/settings/validate-username';
import { useQuery } from '@tanstack/react-query';

export const useValidateUsername = ({
  value,
  username,
}: {
  value: string;
  username: string;
}) => {
  const { data, isFetching } = useQuery({
    queryKey: ['validate-username', value],
    queryFn: () => validateUsername(value),
    staleTime: 0,
    enabled: !!value && value !== username, // Only validate if there's a value and it's different from the current username
  });

  return { data, isFetching };
};
