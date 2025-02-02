import { twMerge } from 'tailwind-merge';

type Props = React.ComponentPropsWithoutRef<'button'>;

export default function Button(props: Props) {
  const { className, children, ...rest } = props;
  return (
    <button
      className={twMerge(
        'h-12 w-36 rounded-full bg-brand text-white disabled:bg-light-gray',
        className,
      )}
      {...rest}
    >
      {children}
    </button>
  );
}