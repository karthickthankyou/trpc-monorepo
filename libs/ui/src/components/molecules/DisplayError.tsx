import { ValidationError } from '@foundation-trpc/util/types'
import { focusOnErrorPath } from '@foundation-trpc/util/functions'

export const DisplayErrors = ({ errors }: { errors: ValidationError[] }) => {
  return (
    <>
      {errors.map((error) =>
        error.path ? (
          <button
            key={error.message}
            className="mb-2 text-xs text-red-500"
            onClick={() => focusOnErrorPath(error?.path?.[0])}
            type="button"
          >
            <span className="capitalize">{error.path}: </span>

            {error.message}
          </button>
        ) : (
          <div key={error.message} className="mb-2 text-xs text-red-500">
            {error.message}
          </div>
        ),
      )}
    </>
  )
}
