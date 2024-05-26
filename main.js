import { z } from "zod"

let errorMessage = ""

const formEl = document.querySelector(".form")
const emailInputEl = document.querySelector(".input-email")
const errorEl = document.querySelector(".error")
const errorIconEl = document.querySelector(".error-icon")

const formSchema = z.object({
  email: z.string().email({ message: "Please provide a valid email" }),
})

const addErrorState = () => {
  emailInputEl.setAttribute("aria-invalid", true)
  errorIconEl.classList.add("show-icon")
}

const removeErrorState = () => {
  emailInputEl.removeAttribute("aria-invalid", false)
  emailInputEl.value = ""
  emailInputEl.blur()
  errorMessage = ""
  errorIconEl.classList.remove("show-icon")
}

formEl.addEventListener("submit", (event) => {
  event.preventDefault()

  const formData = {
    email: emailInputEl.value,
  }

  const validationResult = formSchema.safeParse(formData)

  if (!validationResult.success) {
    const validationResultFormatted = validationResult.error.format()
    errorMessage = validationResultFormatted.email?._errors.join(", ")
    addErrorState()
  } else {
    removeErrorState()
  }
  errorEl.innerHTML = `<p>${errorMessage}</p>`
})
