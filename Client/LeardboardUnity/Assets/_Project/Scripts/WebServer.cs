using UnityEngine;
using System.Collections;
using UnityEngine.Networking;
using SimpleJSON;
using System.Collections.Generic;

public class WebServer : MonoBehaviour {

    public bool m_localTest;
    public string m_localUrl;
    public string m_deploymentUrl;
    
	// Use this for initialization
	void Start () {
	
	}
	
	// Update is called once per frame
	void Update () {
        if (m_localTest)
        {
            m_currentUrl = m_localUrl;
        }else
        {
            m_currentUrl = m_deploymentUrl;
        }
	}

    public void GetPlayerInfo(string _playerName)
    {
        StartCoroutine(GetData("/leaderboard/"+_playerName));
    }

    IEnumerator GetData(string _data)
    {
        UnityWebRequest www = UnityWebRequest.Get(m_currentUrl+_data);

        yield return www.Send();

        if (www.isError)
        {
            Debug.Log(www.error);
        }else
        {
            var N = JSON.Parse(www.downloadHandler.text);
            print(N);
        }
    }
    public void PostScore(int _score)
    {
        StartCoroutine(PostData(_score));
    }
    public void GetTop5()
    {
        StartCoroutine(GetData("/leaderboard/top/5"));
    }
    public void GetLocalLeaderboard(string _playerName)
    {
        StartCoroutine(GetData("/leaderboard/local/3/"+_playerName));
    }
    IEnumerator PostData(int _data)
    {
        string json = "{\"playerName\":\"Bob\",\"score\":\"10\",\"hack\":\"Some bad code\"}";
        string jsonDatatoSend = JsonUtility.ToJson(json);

        WWWForm form = new WWWForm();
        
        form.AddField("message", json);

        UnityWebRequest www = UnityWebRequest.Post(m_currentUrl+"/leaderboard/", form);// "{\"playerName\":\"Arnaud\",\"score\":\"500\"}");

        yield return www.Send();        

        if (www.isError)
        {
            Debug.Log(www.isError);
        }
        else
        {
            var N = JSON.Parse(www.downloadHandler.text);
            print(N["playerName"]);
        }
    }

    private string m_currentUrl;
}   
