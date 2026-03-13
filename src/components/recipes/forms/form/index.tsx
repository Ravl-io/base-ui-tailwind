import { useRef } from 'react';
import type { SyntheticEvent } from 'react';
import { Button } from '@/components/ingredients/button';
import { cn } from '@/lib/utils/utils';
import { getLabel } from '@/lib/utils/getLabel';
import type { FormProps } from './types';

export type { FormProps, FormClassNames, FormLabels } from './types';

const focusFirstError = (form: HTMLFormElement) => {
  const firstError = form.querySelector<HTMLElement>('[aria-invalid="true"]');
  firstError?.focus();
};

export const Form = ({
                       name,
                       onSubmit,
                       onCancel,
                       onReset,
                       error,
                       isSubmitting = false,
                       labels,
                       classNames,
                       children,
                       className,
                       ...props
                     }: FormProps) => {
  const formRef = useRef<HTMLFormElement>(null);

  const handleSubmit = (e: SyntheticEvent<HTMLFormElement>) => {
    e.preventDefault();
    onSubmit(e);
    if (formRef.current) {
      focusFirstError(formRef.current);
    }
  };

  return (
    <form
      ref={formRef}
      aria-label={name}
      noValidate
      onSubmit={handleSubmit}
      className={cn("flex flex-col gap-5", classNames?.root, className)}
      {...props}
    >
      {children}

      <div
        className={cn("flex gap-5", classNames?.actions)}
      >
        {onCancel && (
          <Button
            type="button"
            variant="outline"
            disabled={isSubmitting}
            onClick={onCancel}
            className={cn(classNames?.cancelButton)}
          >
            {getLabel(labels.cancel, "labels.cancel")}
          </Button>
        )}

        {onReset && (
          <Button
            type="reset"
            variant="outline"
            disabled={isSubmitting}
            onClick={onReset}
            className={cn(classNames?.resetButton)}
          >
            {getLabel(labels.reset, "labels.reset")}
          </Button>
        )}

        <Button
          type="submit"
          isLoading={isSubmitting}
          label={{ loading: "labels.submit.loading" }}
          className={cn(classNames?.submitButton)}
        >
          {getLabel(labels.submit, "labels.submit")}
        </Button>
      </div>

      {error && (
        <div
          role="alert"
          aria-live="assertive"
          className={cn(classNames?.error)}
        >
          {error}
        </div>
      )}
    </form>
  );
};