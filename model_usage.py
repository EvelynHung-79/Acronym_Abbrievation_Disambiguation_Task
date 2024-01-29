# import json
import spacy
import torch
# import numpy as np
# from transformers import AutoTokenizer
# from transformers import AutoModelForSequenceClassification
from utils import load_json, AcronymExpander

def get_result(sentence):
    nlp = spacy.load("en_core_web_sm")
    diction = load_json('dataset/diction.json')
    model_name = 'model/checkpoint-2840'
    device = torch.device("cuda" if torch.cuda.is_available() else "cpu")
    
    Expander = AcronymExpander(nlp, diction, model_name, device)
    
    # sentence = "In the following, we will demonstrate the effectiveness of our proposed LML framework in the different datasets."
    # acronyms = Expander.get_acronyms_from_sentence(sentence) //
    # Expander.predict(sentence, acronyms[0])
    
    # result = Expander.format_prediction(sentence, acronyms[0]) //
    
    # sentence = "AR and VR technologies are revolutionizing the way we experience digital content."
    acronyms_list = Expander.get_acronyms_from_sentence(sentence)
    acronyms_results = []
    for acronym in acronyms_list:
        result = Expander.format_prediction(sentence, acronym)
        acronyms_results.append(result['acronyms'][0])
        # expansion, probs = Expander.predict(sentence, acronym)
        # sentence = sentence.replace(acronym, f"{acronym}({expansion})")
    result['acronyms'] = acronyms_results
    return result
