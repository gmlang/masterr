---
layout: post
title: "Prediction vs. Interpretability"
date: 2017-01-30
comments: true
categories: da
keywords: "da mondays, prediction, model interpretability"
published: true
share: true
ads: true

---

When it comes to model interpretability and prediction performance, we often just can't have the best of both worlds. But we almost always want a model that both makes sense and predicts well. This is especially true if we  have expert domain (for example, medicine) knowlege. When presented with a model, the domain expert's state of mind is usually like this: 

* I know more X causes more Y (by my domain knowlege, experience, intuition and etc.), the model has a big positive coefficient in front of X, so it makes sense. I trust the model. 
* I never thought more X could cause more Y, but the model says so. This is interesting. Why would this be? 
* Does the model say more X cause more Y? What? We don't know the answer because the model is a black box? Well, I don't know if I can trust a black box. Wait, the validation results are really good and this implies the model predicts really well. Well, I still don't know if I should trust a black box.

There's no general solution to resolve the tension between predictibility and interpretability. It's all situational. In practice, if the goal is prediction, most of the time, I have no problem sacrificing interpretability by using a black box as long as it validates well on a new unseen dataset. I'd use the black box in production, see how well it predicts and tweak it when its performance gets worse. After all, model building and fine tuning is a continuous process. 


