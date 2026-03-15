from flask import Flask, render_template, request, jsonify
from deep_translator import GoogleTranslator

app = Flask(__name__)

@app.route("/")
def home():
    return render_template("index.html")


@app.route("/translate", methods=["POST"])
def translate():
    text = request.json["text"]
    translated = GoogleTranslator(source='auto', target='en').translate(text)
    return jsonify({"translated": translated})


@app.route("/reply", methods=["POST"])
def reply():
    text = request.json["text"].lower()

    if "hi" in text or "hello" in text:
        reply_text = "Hi Yams 😊"
    elif "how" in text:
        reply_text = "I am good... what about you?"
    else:
        reply_text = "Tell me more..."

    return jsonify({"reply": reply_text})


if __name__ == "__main__":
    app.run(debug=True)