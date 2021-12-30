import classNames from 'classnames'
import styles from '../styles/gg-spinner.module.css'

type SpinnerSize = 'lg' | 'xl' | 'xxl'
type SpinnerProps = {
  size?: SpinnerSize
}

const Spinner: React.FunctionComponent<SpinnerProps> = ({ size }) => (
  <div
    className={classNames(
        styles['gg-spinner'],
        styles[size ?? 0] ? styles[size ?? 0] : null
    )}
    />
)

export default Spinner

export const SpinnerFullPage: React.FunctionComponent<SpinnerProps> = ({
  size = 'xl',
}) => (
  <div className="absolute top-0 left-0 z-50 w-screen transition-all h-screen bg-slate-200/20 dark:bg-slate-900/20 flex justify-center place-items-center">
    <Spinner size={size} />
  </div>
)
