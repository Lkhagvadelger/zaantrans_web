const callProToken = process.env.CALLPRO_SMS_API_KEY || "";
const senderPhoneNumber = process.env.SENDER_PHONE || "";
export const sendVerificationCodeViaCallPro = async (
  phoneNumber: string,
  token: string
) => {
  const message = `App batalgaajuulakh kod ${token}`;
  phoneNumber = phoneNumber.replace("+976", "");
  const url = `https://api.messagepro.mn/send?key=${callProToken}&from=${senderPhoneNumber}&to=${phoneNumber}&text=${message}`;
  //send request to chatwoot
  const response = await fetch(url, {
    method: "GET",
  });
  if (response.status === 200) {
  }
  if (response.status === 404) {
  }
  return {};
};
