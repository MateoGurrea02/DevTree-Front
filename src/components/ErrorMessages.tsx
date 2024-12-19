type ErrorMessageProps = {
  children: React.ReactNode
} 

export default function ErrorMessages({children} : ErrorMessageProps) {
  return (
    <p className="text-red-500 text-sm pl-1">{children}</p>
  )
}
