using UnityEngine;
using System.Collections;
using UnityEngine.Networking;
using SimpleJSON;
using System.Collections.Generic;

public class WebServer : MonoBehaviour {

    public string m_serverAdress;
    
	// Use this for initialization
	void Start () {
	
	}
	
	// Update is called once per frame
	void Update () {
	
	}

    public void WebRequest()
    {
        StartCoroutine(GetData());
    }

    IEnumerator GetData()
    {
        UnityWebRequest www = UnityWebRequest.Get(m_serverAdress);

        yield return www.Send();

        if (www.isError)
        {
            Debug.Log(www.error);
        }else
        {
            Debug.Log(www.downloadHandler.text);
        }
    }
    public void PostScore(int _score)
    {
        StartCoroutine(PostData(_score));
    }

    IEnumerator PostData(int _data)
    {
        string json = "{\"playerName\":\"Sam\",\"score\":\"10\",\"hack\":\"Some bad code\"}";
        string jsonDatatoSend = JsonUtility.ToJson(json);

        WWWForm form = new WWWForm();
        
        form.AddField("message", json);

        UnityWebRequest www = UnityWebRequest.Post("http://localhost:3000/leaderboard/", form);// "{\"playerName\":\"Arnaud\",\"score\":\"500\"}");

        yield return www.Send();


        

        if (www.isError)
        {
            Debug.Log(www.isError);
        }
        else
        {
            print(www.downloadHandler.text);
        }
    }
}   
