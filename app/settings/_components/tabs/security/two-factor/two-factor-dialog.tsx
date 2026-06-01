'use client';

import { Button } from '@/components/ui/button';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import {
  Stepper,
  StepperItem,
  StepperTrigger,
  StepperIndicator,
  StepperSeparator,
  StepperTitle,
  StepperNav,
  StepperPanel,
  StepperContent,
} from '@/components/ui/stepper';
import { cn } from '@/lib/utils';
import { useState } from 'react';
import { FaCheck } from 'react-icons/fa';
import VerifyStep from './verify-step';

const steps = [
  { id: 'verify', title: 'Verify' },
  { id: 'setup', title: 'Setup', content: <div>setup</div> },
  { id: 'done', title: 'Done', content: <div>done</div> },
];

const TwoFactorDialog = () => {
  const [openDialog, setOpenDialog] = useState(false);
  const [currentStep, setCurrentStep] = useState(steps[0].id);
  const [password, setPassword] = useState('');

  const completed = currentStep === 'done';

  const handleMoveToNextStep = () => {
    setCurrentStep((prev) => {
      const currentIndex = steps.findIndex((step) => step.id === prev);
      if (prev === 'done') {
        setOpenDialog(false); // Close the dialog
        return steps[0].id; // Reset to the first step
      } else {
        const nextStep = steps[currentIndex + 1];
        return nextStep.id;
      }
    });
  };

  return (
    <Dialog
      open={openDialog}
      onOpenChange={(value) => {
        setOpenDialog(value);
        if (value === false) {
          setCurrentStep(steps[0].id);
        }
      }}
    >
      <DialogTrigger asChild>
        <Button size='sm' className='self-center shrink-0'>
          Enable
        </Button>
      </DialogTrigger>
      <DialogContent className='sm:max-w-2xl gap-10'>
        <DialogHeader>
          <DialogTitle>Enable Two-Factor Authentication</DialogTitle>
        </DialogHeader>
        {/* Steps */}
        <Stepper
          indicators={{
            completed: <FaCheck />,
            active: completed ? <FaCheck /> : undefined,
          }}
          steps={steps}
          value={currentStep}
          className='flex flex-col gap-12'
        >
          <StepperNav className='w-full'>
            {steps.map((step, index) => (
              <StepperItem key={index} stepId={step.id} className='relative flex-1'>
                <StepperTrigger className={cn('flex flex-col gap-2.5 pointer-events-none')}>
                  <StepperIndicator className={cn(completed && 'bg-green-500!')}>{index + 1}</StepperIndicator>
                  <StepperTitle>{step.title}</StepperTitle>
                </StepperTrigger>
                {steps.length > index + 1 && (
                  <StepperSeparator
                    className={cn(
                      'absolute inset-x-0 top-2 right-[calc(-50%+18px)] left-[calc(50%+18px)]',
                      completed && 'group-data-[state=completed]/step:bg-green-500',
                    )}
                  />
                )}
              </StepperItem>
            ))}
          </StepperNav>
          <StepperPanel>
            {steps.map((step) => (
              <StepperContent key={step.id} value={step.id}>
                {step.id === 'verify' && <VerifyStep onNext={handleMoveToNextStep} setPassword={setPassword} />}
              </StepperContent>
            ))}
          </StepperPanel>
        </Stepper>
      </DialogContent>
    </Dialog>
  );
};

export default TwoFactorDialog;
