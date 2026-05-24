'use client';

import { User } from '@/lib/generated/prisma/client';
import {
  DetailsSettingsFormData,
  detailsSettingsSchema,
} from '@/schema/settings';
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';

type DetailsSettingsFormProps = {
  user: Pick<
    User,
    'name' | 'displayName' | 'email' | 'bio' | 'website' | 'location'
  >;
};

const DetailsSettingsForm = ({ user }: DetailsSettingsFormProps) => {
  const form = useForm<DetailsSettingsFormData>({
    resolver: zodResolver(detailsSettingsSchema),
    defaultValues: {
      name: user.name,
      displayName: user.displayName || null,
      email: user.email,
      bio: user.bio || null,
      website: user.website || null,
      location: user.location || null,
    },
  });

  const onSubmit = (data: DetailsSettingsFormData) => {
    console.log(data);
  };

  const { handleSubmit, formState } = form;
  const { isSubmitting } = formState;

  return <form onSubmit={handleSubmit(onSubmit)}></form>;
};

export default DetailsSettingsForm;
